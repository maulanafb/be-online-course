import { Prisma } from '@prisma/client';
import { IsDefined, IsEmail, IsString, MaxLength } from 'class-validator';

export class User implements Prisma.UserUncheckedCreateInput {
  @IsString()
  id: string;

  @IsDefined()
  @IsString()
  @MaxLength(255)
  email: string;

  @IsDefined()
  @IsString()
  @MaxLength(255)
  password: string;

  @IsDefined()
  @IsString()
  @MaxLength(255)
  provider: string;
}
