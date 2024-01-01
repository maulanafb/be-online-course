import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
