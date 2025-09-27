import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  InternalServerErrorException
} from '@nestjs/common';
import { CompanyRepository } from 'src/shared/database/repositories/company.repositories';
import * as bcrypt from 'bcrypt';
import { CompaniesService } from '../companies/companies.service';
import { RepresentativesService } from '../representatives/representatives.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SignupCompanyDto, SignupEmployeeDto } from './dto/signup-auth-dto';
import { SigninDto } from './dto/signin-auth-dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly companyRepository: CompanyRepository,
    private readonly companyService: CompaniesService,
    private readonly representativesService: RepresentativesService,
    private readonly usersService: UsersService,
  ) {}

  async signupCompany(signupCompanyDto: SignupCompanyDto) {
    const { name, cpf, email, password, cnpj, companyName, arrangement } =
      signupCompanyDto;

    // 🔹 Valida se empresa já existe
    const existingCompany = await this.companyRepository.findFirst({
      where: { cnpj },
    });
    if (existingCompany) {
      throw new BadRequestException('CNPJ já cadastrado');
    }

    // 🔹 Valida se empresa já existe
    const existingEmail = await this.representativesService.findByEmail(email);
  if (existingEmail) {
    throw new BadRequestException('Email já cadastrado');
  }
    // 🔹 Cria empresa
    const company = await this.companyService.create({
      arrangement,
      companyName,
      cnpj,
    });

    // 🔹 Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔹 Cria representante vinculado
    const representative = await this.representativesService.create({
      name,
      cpf,
      email,
      passwordHash: hashedPassword,
      companyId: company.id,
    });

    const token = await this.generateAccessToken({
      email: representative.email,
      role: 'companyRepresent',
      userId: representative.id,
    });

    return { accessToken: token };
  }

  async signupEmployee(signupEmployeeDto: SignupEmployeeDto) {
    try {
      const { companyId, cpf, email, name, password, salary } =
        signupEmployeeDto;

      // 🔹 Valida se representante já existe
      const existingEmp = await this.usersService.findByCPFOrEmail({cpf, email});
      if (existingEmp) {
        throw new BadRequestException('CPF ou e-mail já cadastrado');
      }

      // 🔹 Hash da senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // 🔹 Cria representante vinculado
      const employee = await this.usersService.create({
        cpf,
        email,
        name,
        passwordHash: hashedPassword,
        salary,
        companyId,
      });

      const token = await this.generateAccessToken({
        userId: employee.id,
        email: employee.email,
        role: 'worker',
      });

      return { accessToken: token };
    } catch (error) {
      console.log("🚀 ~ AuthService ~ signupEmployee ~ error:", error)
      throw new InternalServerErrorException(error.message)
    }
  }

  async signinCompanyRep(signupDto: SigninDto) {
    const { email, password } = signupDto;
    const rep = await this.representativesService.findByEmail(email);
    if (!rep) throw new UnauthorizedException('Credenciais inválidas');

    const isPasswordValid = await bcrypt.compare(password, rep.passwordHash);
    if (!isPasswordValid)
      throw new UnauthorizedException('Credenciais inválidas');

    const token = await this.generateAccessToken({
      userId: rep.id,
      email: rep.email,
      role: 'companyRepresent',
    });

    return { accessToken: token };
  }

  async signinEmployee(signupDto: SigninDto) {
    const { email, password } = signupDto;
    console.log("🚀 ~ AuthService ~ signinEmployee ~ email:", email)

    const worker =
      await this.usersService.findByCPFOrEmail({email});
    if (!worker)
      throw new UnauthorizedException('Credenciais inválidas1');

    const isPasswordValid = await bcrypt.compare(
      password,
      worker.passwordHash,
    );
    if (!isPasswordValid)
      throw new UnauthorizedException('Credenciais inválidas');

    const token = await this.generateAccessToken({
      userId: worker.id,
      email: worker.email,
      role: 'worker',
    });

    return { accessToken: token };
  }

  private async generateAccessToken({
    userId,
    email,
    role,
  }: {
    userId: string;
    email: string;
    role: 'worker' | 'companyRepresent';
  }) {
    return await this.jwtService.signAsync({
      sub: userId,
      email,
      role,
    });
  }
}
