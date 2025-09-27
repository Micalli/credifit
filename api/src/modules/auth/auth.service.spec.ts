import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { CompanyRepository } from 'src/shared/database/repositories/company.repositories';
import { CompaniesService } from '../companies/companies.service';
import { RepresentativesService } from '../representatives/representatives.service';
import { UsersService } from '../users/users.service';
import { SignupCompanyDto, SignupEmployeeDto } from './dto/signup-auth-dto';
import { SigninDto } from './dto/signin-auth-dto';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: jest.Mocked<JwtService>;
  let companyRepository: jest.Mocked<CompanyRepository>;
  let companyService: jest.Mocked<CompaniesService>;
  let representativesService: jest.Mocked<RepresentativesService>;
  let usersService: jest.Mocked<UsersService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
        {
          provide: CompanyRepository,
          useValue: {
            findFirst: jest.fn(),
            create: jest.fn(),
            findUnique: jest.fn(),
          },
        },
        {
          provide: CompaniesService,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: RepresentativesService,
          useValue: {
            create: jest.fn(),
            findByEmail: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findByCPFOrEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get(JwtService);
    companyRepository = module.get(CompanyRepository);
    companyService = module.get(CompaniesService);
    representativesService = module.get(RepresentativesService);
    usersService = module.get(UsersService);
  });

  describe('signupCompany', () => {
    const signupCompanyDto: SignupCompanyDto = {
      name: 'João Silva',
      cpf: '12345678901',
      email: 'joao@empresa.com',
      password: '123456',
      cnpj: '12345678000199',
      companyName: 'Empresa Teste',
      arrangement: true,
    };

    it('deve criar empresa e representante com sucesso', async () => {
      // Arrange
      const mockCompany = { id: 'company-1', cnpj: '12345678000199' };
      const mockRepresentative = { 
        id: 'rep-1', 
        email: 'joao@empresa.com',
        name: 'João Silva' 
      };
      const mockToken = 'jwt-token-123';

      companyRepository.findFirst.mockResolvedValue(null);
      companyService.create.mockResolvedValue(mockCompany);
      representativesService.create.mockResolvedValue(mockRepresentative);
      jwtService.signAsync.mockResolvedValue(mockToken);

      // Act
      const result = await service.signupCompany(signupCompanyDto);

      // Assert
      expect(companyRepository.findFirst).toHaveBeenCalledWith({
        where: { cnpj: '12345678000199' },
      });
      expect(companyService.create).toHaveBeenCalledWith({
        arrangement: true,
        companyName: 'Empresa Teste',
        cnpj: '12345678000199',
      });
      expect(representativesService.create).toHaveBeenCalledWith({
        name: 'João Silva',
        cpf: '12345678901',
        email: 'joao@empresa.com',
        passwordHash: expect.any(String),
        companyId: 'company-1',
      });
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        email: 'joao@empresa.com',
        role: 'companyRepresent',
        userId: 'rep-1',
      });
      expect(result).toEqual({ accessToken: 'jwt-token-123' });
    });

    it('deve lançar BadRequestException quando CNPJ já existe', async () => {
      // Arrange
      companyRepository.findFirst.mockResolvedValue({ id: 'existing-company' });

      // Act & Assert
      await expect(service.signupCompany(signupCompanyDto))
        .rejects.toThrow(BadRequestException);
      await expect(service.signupCompany(signupCompanyDto))
        .rejects.toThrow('CNPJ já cadastrado');
    });
  });

  describe('signupEmployee', () => {
    const signupEmployeeDto: SignupEmployeeDto = {
      name: 'Maria Santos',
      cpf: '98765432100',
      email: 'maria@empresa.com',
      password: '123456',
      salary: 5000,
      companyId: 'company-1',
    };

    it('deve criar funcionário com sucesso', async () => {
      // Arrange
      const mockEmployee = { 
        id: 'emp-1', 
        email: 'maria@empresa.com',
        name: 'Maria Santos' 
      };
      const mockToken = 'jwt-token-456';

      usersService.findByCPFOrEmail.mockResolvedValue(null);
      usersService.create.mockResolvedValue(mockEmployee);
      jwtService.signAsync.mockResolvedValue(mockToken);

      // Act
      const result = await service.signupEmployee(signupEmployeeDto);

      // Assert
      expect(usersService.findByCPFOrEmail).toHaveBeenCalledWith({
        cpf: '98765432100',
        email: 'maria@empresa.com',
      });
      expect(usersService.create).toHaveBeenCalledWith({
        cpf: '98765432100',
        email: 'maria@empresa.com',
        name: 'Maria Santos',
        passwordHash: expect.any(String),
        salary: 5000,
        companyId: 'company-1',
      });
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        userId: 'emp-1',
        email: 'maria@empresa.com',
        role: 'worker',
      });
      expect(result).toEqual({ accessToken: 'jwt-token-456' });
    });

    it('deve lançar BadRequestException quando CPF ou email já existe', async () => {
      // Arrange
      usersService.findByCPFOrEmail.mockResolvedValue({ id: 'existing-employee' });

      // Act & Assert
      await expect(service.signupEmployee(signupEmployeeDto))
        .rejects.toThrow(BadRequestException);
      await expect(service.signupEmployee(signupEmployeeDto))
        .rejects.toThrow('CPF ou e-mail já cadastrado');
    });

    it('deve lançar InternalServerErrorException quando ocorre erro interno', async () => {
      // Arrange
      usersService.findByCPFOrEmail.mockRejectedValue(new Error('Database error'));

      // Act & Assert
      await expect(service.signupEmployee(signupEmployeeDto))
        .rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('signinCompanyRep', () => {
    const signinDto: SigninDto = {
      email: 'joao@empresa.com',
      password: '123456',
    };

    it('deve fazer login com credenciais válidas', async () => {
      // Arrange
      const hashedPassword = await bcrypt.hash('123456', 10);
      const mockRepresentative = {
        id: 'rep-1',
        email: 'joao@empresa.com',
        passwordHash: hashedPassword,
      };
      const mockToken = 'jwt-token-789';

      representativesService.findByEmail.mockResolvedValue(mockRepresentative);
      jwtService.signAsync.mockResolvedValue(mockToken);

      // Act
      const result = await service.signinCompanyRep(signinDto);

      // Assert
      expect(representativesService.findByEmail).toHaveBeenCalledWith('joao@empresa.com');
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        userId: 'rep-1',
        email: 'joao@empresa.com',
        role: 'companyRepresent',
      });
      expect(result).toEqual({ accessToken: 'jwt-token-789' });
    });

    it('deve lançar UnauthorizedException quando representante não existe', async () => {
      // Arrange
      representativesService.findByEmail.mockResolvedValue(null);

      // Act & Assert
      await expect(service.signinCompanyRep(signinDto))
        .rejects.toThrow(UnauthorizedException);
      await expect(service.signinCompanyRep(signinDto))
        .rejects.toThrow('Credenciais inválidas');
    });

    it('deve lançar UnauthorizedException quando senha está incorreta', async () => {
      // Arrange
      const hashedPassword = await bcrypt.hash('wrong-password', 10);
      const mockRepresentative = {
        id: 'rep-1',
        email: 'joao@empresa.com',
        passwordHash: hashedPassword,
      };

      representativesService.findByEmail.mockResolvedValue(mockRepresentative);

      // Act & Assert
      await expect(service.signinCompanyRep(signinDto))
        .rejects.toThrow(UnauthorizedException);
      await expect(service.signinCompanyRep(signinDto))
        .rejects.toThrow('Credenciais inválidas');
    });
  });

  describe('signinEmployee', () => {
    const signinDto: SigninDto = {
      email: 'maria@empresa.com',
      password: '123456',
    };

    it('deve fazer login com credenciais válidas', async () => {
      // Arrange
      const hashedPassword = await bcrypt.hash('123456', 10);
      const mockEmployee = {
        id: 'emp-1',
        email: 'maria@empresa.com',
        passwordHash: hashedPassword,
      };
      const mockToken = 'jwt-token-101112';

      usersService.findByCPFOrEmail.mockResolvedValue(mockEmployee);
      jwtService.signAsync.mockResolvedValue(mockToken);

      // Act
      const result = await service.signinEmployee(signinDto);

      // Assert
      expect(usersService.findByCPFOrEmail).toHaveBeenCalledWith({
        email: 'maria@empresa.com',
      });
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        userId: 'emp-1',
        email: 'maria@empresa.com',
        role: 'worker',
      });
      expect(result).toEqual({ accessToken: 'jwt-token-101112' });
    });

    it('deve lançar UnauthorizedException quando funcionário não existe', async () => {
      // Arrange
      usersService.findByCPFOrEmail.mockResolvedValue(null);

      // Act & Assert
      await expect(service.signinEmployee(signinDto))
        .rejects.toThrow(UnauthorizedException);
      await expect(service.signinEmployee(signinDto))
        .rejects.toThrow('Credenciais inválidas1');
    });

    it('deve lançar UnauthorizedException quando senha está incorreta', async () => {
      // Arrange
      const hashedPassword = await bcrypt.hash('wrong-password', 10);
      const mockEmployee = {
        id: 'emp-1',
        email: 'maria@empresa.com',
        passwordHash: hashedPassword,
      };

      usersService.findByCPFOrEmail.mockResolvedValue(mockEmployee);

      // Act & Assert
      await expect(service.signinEmployee(signinDto))
        .rejects.toThrow(UnauthorizedException);
      await expect(service.signinEmployee(signinDto))
        .rejects.toThrow('Credenciais inválidas');
    });
  });

  describe('generateAccessToken', () => {
    it('deve gerar token JWT com dados corretos', async () => {
      // Arrange
      const mockToken = 'generated-jwt-token';
      const tokenData = {
        userId: 'user-123',
        email: 'test@example.com',
        role: 'worker' as const,
      };

      jwtService.signAsync.mockResolvedValue(mockToken);

      // Act
      const result = await (service as any).generateAccessToken({email: tokenData.email, role: tokenData.role, userId: tokenData.userId});

      // Assert
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        sub: 'user-123',
        email: 'test@example.com',
        role: 'worker',
      });
      expect(result).toBe(mockToken);
    });

    it('deve gerar token para representante de empresa', async () => {
      // Arrange
      const mockToken = 'company-rep-token';
      const tokenData = {
        userId: 'rep-123',
        email: 'rep@company.com',
        role: 'companyRepresent' as const,
      };

      jwtService.signAsync.mockResolvedValue(mockToken);

      // Act
      const result = await (service as any).generateAccessToken(tokenData);

      // Assert
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        sub: 'rep-123',
        email: 'rep@company.com',
        role: 'companyRepresent',
      });
      expect(result).toBe(mockToken);
    });
  });
});
