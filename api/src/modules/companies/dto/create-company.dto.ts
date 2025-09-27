import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  cnpj: string;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsBoolean()
  @IsNotEmpty()
  arrangement: boolean;
}
