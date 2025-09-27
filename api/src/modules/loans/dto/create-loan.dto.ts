import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLoanDto {

  @IsNumber()
  @IsNotEmpty()
  amount: number;
  @IsNumber()
  @IsNotEmpty()
  installmentsNumber: number;
}
