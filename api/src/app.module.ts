import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { RepresentativesModule } from './modules/representatives/representatives.module';
import { UsersModule } from './modules/users/users.module';
import { LoansModule } from './modules/loans/loans.module';
import { InstallmentsModule } from './modules/installments/installments.module';
import { DatabaseModule } from './shared/database/database.module';
import { AuthGuard } from './modules/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    CompaniesModule,
    RepresentativesModule,
    UsersModule,
    LoansModule,
    InstallmentsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
