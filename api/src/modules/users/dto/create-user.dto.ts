import { IsEmail, IsNumber, IsPositive, IsString, Max } from 'class-validator';

export class CreateUserDto {
  @IsString()
  cpf: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  @Max(8)
  passwordHash: string;

  @IsNumber()
  @IsPositive()
  salary: number;

  @IsString()
  companyId: string;
}
