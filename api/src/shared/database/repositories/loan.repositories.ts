import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class LoanRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.LoanCreateArgs) {
    return this.prismaService.loan.create(createDto);
  }

  findUnique(findUniqueDto: Prisma.LoanFindUniqueArgs) {
    return this.prismaService.loan.findUnique(findUniqueDto);
  }

  findFirst(findFirstDto: Prisma.LoanFindFirstArgs) {
    return this.prismaService.loan.findFirst(findFirstDto);
  }
  findMany(findUniqueDto: Prisma.LoanFindManyArgs) {
    return this.prismaService.loan.findMany(findUniqueDto);
  }
}
