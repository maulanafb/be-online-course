import {
  IsMongoId,
  IsNotEmpty,
  IsNumberString,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCourseDto {
  @IsString()
  name: string;

  // @IsString()
  // slug: string;

  // @IsString()
  // thumbnail: string;

  @IsNotEmpty()
  price: number;

  @IsOptional()
  @IsString()
  Level: string;

  @IsString()
  description: string;

  @IsString()
  categoryId: string;

  @IsOptional()
  @IsString()
  @IsMongoId()
  mentorId: string;

  @IsOptional()
  @IsString()
  @IsMongoId()
  lessonId: string;
}
