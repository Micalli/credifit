import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CompanyRepresentativeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.CompanyRepresentativeCreateArgs) {
    return this.prismaService.companyRepresentative.create(createDto);
  }

  findUnique(findUniqueDto: Prisma.CompanyRepresentativeFindUniqueArgs) {
    return this.prismaService.companyRepresentative.findUnique(findUniqueDto);
  }
  
  findFirst(findFirstDto: Prisma.CompanyRepresentativeFindFirstArgs) {
    return this.prismaService.companyRepresentative.findFirst(findFirstDto);
  }
}
