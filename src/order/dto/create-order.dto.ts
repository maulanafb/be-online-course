import { IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  courseId: string;

  @IsString()
  userId: string;

  @IsString()
  snap_token: string;

  @IsString()
  status: string;

  @IsNumber()
  price: number;
}
