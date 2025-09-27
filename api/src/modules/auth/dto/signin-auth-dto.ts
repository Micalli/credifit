import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class SigninDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}
