import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CompanyRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.CompanyCreateArgs) {
    return this.prismaService.company.create(createDto);
  }

  findUnique(findUniqueDto: Prisma.CompanyFindUniqueArgs) {
    return this.prismaService.company.findUnique(findUniqueDto);
  }

  findFirst(findFirstDto: Prisma.CompanyFindFirstArgs) {
    return this.prismaService.company.findFirst(findFirstDto);
  }
  findMany(findUniqueDto: Prisma.CompanyFindManyArgs) {
    return this.prismaService.company.findMany(findUniqueDto);
  }
}
