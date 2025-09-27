import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class LoanInstallmentRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.LoanInstallmentCreateArgs) {
    return this.prismaService.loanInstallment.create(createDto);
  }
  createMany(createManyDto: Prisma.LoanInstallmentCreateManyArgs) {
    return this.prismaService.loanInstallment.createMany(createManyDto);
  }

  findUnique(findUniqueDto: Prisma.LoanInstallmentFindUniqueArgs) {
    return this.prismaService.loanInstallment.findUnique(findUniqueDto);
  }

  findFirst(findFirstDto: Prisma.LoanInstallmentFindFirstArgs) {
    return this.prismaService.loanInstallment.findFirst(findFirstDto);
  }
  findMany(findUniqueDto: Prisma.LoanInstallmentFindManyArgs) {
    return this.prismaService.loanInstallment.findMany(findUniqueDto);
  }
}
