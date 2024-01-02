import { IsMongoId, IsString } from 'class-validator';

export class CreateCourseGoalDto {
  @IsString()
  title: string;

  @IsMongoId()
  courseId: string;
}
