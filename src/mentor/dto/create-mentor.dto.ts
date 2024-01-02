import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateMentorDto {
  @IsString()
  name: string;

  thumbnail: string;

  @IsOptional()
  @IsMongoId()
  courseId?: string;
}
