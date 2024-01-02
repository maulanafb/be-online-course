import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateMentorDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly thumbnail: string;

  @IsOptional()
  @IsMongoId()
  readonly courseId?: string;
}
