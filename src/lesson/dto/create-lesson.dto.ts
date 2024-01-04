import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateLessonDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  @IsOptional()
  mentorNote: string;

  @IsMongoId()
  chapterId: string;
}
