import { Injectable } from '@nestjs/common';
import { CreateRepresentativeDto } from './dto/create-representative.dto';
import { UpdateRepresentativeDto } from './dto/update-representative.dto';
import { CompanyRepresentativeRepository } from 'src/shared/database/repositories/companyRepresentative.repositories ';
import { handleError } from 'src/utils/erroHandler';

@Injectable()
export class RepresentativesService {
  constructor(
    private readonly companyRepresentativeRepository: CompanyRepresentativeRepository,
  ) {}

  async create(createRepresentativeDto: CreateRepresentativeDto) {
    try {
      const { cpf, email, name, passwordHash, companyId } =
        createRepresentativeDto;
      return await this.companyRepresentativeRepository.create({
        data: {
          cpf,
          email,
          name,
          passwordHash,
          companyId,
        },
      });
    } catch (error) {
      handleError(error, 'Error create representavive company');
    }
  }

  async findByEmail(email: string) {
    try {
      
      return await this.companyRepresentativeRepository.findUnique({
        where: {
          email
        }
      });
    } catch (error) {
      handleError(error, 'Error find representavive company by email');
    }
  }

  findAll() {
    return `This action returns all representatives`;
  }

  findOne(id: number) {
    return `This action returns a #${id} representative`;
  }

  update(id: number, updateRepresentativeDto: UpdateRepresentativeDto) {
    return `This action updates a #${id} representative`;
  }

  remove(id: number) {
    return `This action removes a #${id} representative`;
  }
}
