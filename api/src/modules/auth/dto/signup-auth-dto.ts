import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Length,
  Matches,
} from 'class-validator';

export class SignupCompanyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @Matches(/^\d{11}$/, { message: 'CPF deve ter 11 dígitos' })
  cpf: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  @IsNotEmpty()
  @Matches(/^\d{14}$/, { message: 'CNPJ deve ter 14 dígitos' })
  cnpj: string;

  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsNotEmpty()
  @IsBoolean()
  arrangement: boolean;
}

export class SignupEmployeeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @Matches(/^\d{11}$/, { message: 'CPF deve ter 11 dígitos' })
  cpf: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  @IsNotEmpty()
  @IsNumber()
  salary: number;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  companyId: string;
}
