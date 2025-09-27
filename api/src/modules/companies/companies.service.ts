import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyRepository } from 'src/shared/database/repositories/company.repositories';
import { handleError } from 'src/utils/erroHandler';

@Injectable()
export class CompaniesService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async create(createCompanyDto: CreateCompanyDto) {
    try {
      const { arrangement, cnpj, companyName } = createCompanyDto;
      const company = await this.companyRepository.create({
        data: {
          arrangement,
          cnpj,
          companyName,
        },
      });
      return company;
    } catch (error) {
      handleError(error, 'Error creating company');
    }
  }
  async findCompanyWorkers(companyId: string) {
    try {
      const usersCompany = await this.companyRepository.findUnique({
        where: { id: companyId },
        include: { users: true },
      });
   
      return usersCompany;
    } catch (error) {
      handleError('Não foi possivel pegar usuarios da empresa');
    }
  }

  async findAll() {
    try {
      const companies = await this.companyRepository.findMany({});
      return companies;
    } catch (error) {
      handleError(error, 'Error find companies');
    }
  }

  async findOne(id: string) {
    try {
      const company = await this.companyRepository.findUnique({
        where: { id },
      });
      return company;
    } catch (error) {
      handleError(error, 'Error find companie');
    }
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
