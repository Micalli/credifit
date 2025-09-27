import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CompanyRepository } from './repositories/company.repositories';
import { CompanyRepresentativeRepository } from './repositories/companyRepresentative.repositories ';
import { UsersRepository } from './repositories/users.repositories';
import { LoanRepository } from './repositories/loan.repositories';
import { LoanInstallmentRepository } from './repositories/installment.repositories';

@Global()
@Module({
  providers: [
    PrismaService,
    CompanyRepository,
    CompanyRepresentativeRepository,
    UsersRepository,
    LoanRepository,
    LoanInstallmentRepository,
  ],
  exports: [
    CompanyRepository,
    CompanyRepresentativeRepository,
    UsersRepository,
    LoanRepository,
    LoanInstallmentRepository,
  ],
})
export class DatabaseModule {}
