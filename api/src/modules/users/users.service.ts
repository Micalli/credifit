import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { handleError } from 'src/utils/erroHandler';
import { CompanyRepresentativeRepository } from 'src/shared/database/repositories/companyRepresentative.repositories ';
import { CompanyRepository } from 'src/shared/database/repositories/company.repositories';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private companyRepository: CompanyRepository,

    private companyRepresentativeRepository: CompanyRepresentativeRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { cpf, email, name, passwordHash, salary, companyId } =
        createUserDto;
      return await this.usersRepository.create({
        data: {
          cpf,
          email,
          name,
          passwordHash,
          salary,
          companyId,
        },
      });
    } catch (error) {
      handleError(error, 'Erro create employe');
    }
  }

  async findByCPFOrEmail({ email, cpf }: { email: string; cpf?: string }) {
    console.log('🚀 ~ UsersService ~ findByCPFOrEmail ~ email:', email);
    try {
      return await this.usersRepository.findFirst({
        where: {
          OR: [{ cpf }, { email }],
        },
      });
    } catch (error) {
      handleError(error, 'Erro create employe');
    }
  }

  async me(userId: string) {
    try {
      const userEmployeer = await this.usersRepository.findUnique({
        where: { id: userId },
        select: { companyId: true, email: true, name: true, salary: true },
      });
      if (userEmployeer) {
        const company = await this.companyRepository.findUnique({
          where: { id: userEmployeer.companyId },
        });
        return {
          ...userEmployeer,
          role: 'worker',
          companyName: company.companyName,
        };
      }
      const usercompanyRepresent =
        await this.companyRepresentativeRepository.findUnique({
          where: { id: userId },
          select: { companyId: true, email: true, name: true },
        });

      if (usercompanyRepresent) {
        return {
          ...usercompanyRepresent,
          role: 'companyRepresent',
        };
      }
    } catch (error) {
      handleError('Não foi possivel pegar dados do usuario');
    }
  }
}
