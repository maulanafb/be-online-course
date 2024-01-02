import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseGoalDto } from './dto/create-course-goal.dto';
import { UpdateCourseGoalDto } from './dto/update-course-goal.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CourseGoalsService {
  constructor(private prismaService: PrismaService) {}

  async create(createCourseGoalDto: CreateCourseGoalDto) {
    const createGoal = await this.prismaService.courseGoals.create({
      data: createCourseGoalDto,
    });

    return {
      data: createGoal,
      statusCode: HttpStatus.CREATED,
      message: 'Course goals created',
    };
  }

  async findAll() {
    const goals = await this.prismaService.courseGoals.findMany();
    return {
      data: goals,
      statusCode: HttpStatus.OK,
      message: 'Course goals',
    };
  }

  async findOne(id: string) {
    const goal = await this.prismaService.courseGoals.findUnique({
      where: { id },
    });
    if (!goal) throw new NotFoundException();
    return {
      data: goal,
      statusCode: HttpStatus.OK,
      message: 'Course goals',
    };
  }

  async update(id: string, updateCourseGoalDto: UpdateCourseGoalDto) {
    const goal = await this.prismaService.courseGoals.update({
      where: { id },
      data: updateCourseGoalDto,
    });

    return {
      data: goal,
      statusCode: HttpStatus.OK,
      message: 'Course goals updated successfully',
    };
  }

  async remove(id: string) {
    const deleteGoal = await this.prismaService.courseGoals.delete({
      where: { id },
    });
    return {
      data: deleteGoal,
      statusCode: HttpStatus.OK,
      message: 'Course goals deleted successfully',
    };
  }
}
