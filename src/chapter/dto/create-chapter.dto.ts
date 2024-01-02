import { IsString, IsMongoId, IsOptional } from 'class-validator';
export class CreateChapterDto {
  @IsString()
  title: string;

  @IsMongoId()
  courseId: string;

  // @IsString()
  // @IsOptional()
  // mentorNote: string;
}
