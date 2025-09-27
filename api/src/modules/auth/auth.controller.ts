import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupCompanyDto, SignupEmployeeDto } from './dto/signup-auth-dto';
import { SigninDto } from './dto/signin-auth-dto';
import { IsPublic } from 'src/shared/decorators/isPublic';

@IsPublic()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup/company')
  sigupCompany(@Body() signupCompanyDto: SignupCompanyDto) {
    return this.authService.signupCompany(signupCompanyDto);
  }

  @Post('signup/employee')
  sigupEmploye(@Body() signupEmployeeDto: SignupEmployeeDto) {
    return this.authService.signupEmployee(signupEmployeeDto);
  }

  @Post('signin/company')
  signinCompany(@Body() signinDto: SigninDto) {
    return this.authService.signinCompanyRep(signinDto);
  }

  @Post('signin/employee')
  signinEmploye(@Body() signinDto: SigninDto) {
    return this.authService.signinEmployee(signinDto);
  }
}
