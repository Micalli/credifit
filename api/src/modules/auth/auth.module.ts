import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RepresentativesModule } from '../representatives/representatives.module';
import { CompaniesModule } from '../companies/companies.module';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'src/shared/config/env';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    RepresentativesModule,
    CompaniesModule,
    UsersModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
