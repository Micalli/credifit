import { IsNotEmpty, IsString, IsUUID, Max } from 'class-validator';

export class CreateRepresentativeDto {
  @IsString()
  @IsNotEmpty()
  cpf: string;
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  @Max(8)
  passwordHash: string;
  @IsUUID()
  @IsNotEmpty()
  companyId: string;
}
