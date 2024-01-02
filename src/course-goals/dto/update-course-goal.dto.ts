import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseGoalDto } from './create-course-goal.dto';

export class UpdateCourseGoalDto extends PartialType(CreateCourseGoalDto) {}
