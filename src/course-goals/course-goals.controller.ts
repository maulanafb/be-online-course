import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CourseGoalsService } from './course-goals.service';
import { CreateCourseGoalDto } from './dto/create-course-goal.dto';
import { UpdateCourseGoalDto } from './dto/update-course-goal.dto';

@Controller('course-goals')
export class CourseGoalsController {
  constructor(private readonly courseGoalsService: CourseGoalsService) {}

  @Post()
  async create(@Body() createCourseGoalDto: CreateCourseGoalDto) {
    return await this.courseGoalsService.create(createCourseGoalDto);
  }

  @Get()
  async findAll() {
    return await this.courseGoalsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.courseGoalsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCourseGoalDto: UpdateCourseGoalDto,
  ) {
    return await this.courseGoalsService.update(id, updateCourseGoalDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.courseGoalsService.remove(id);
  }
}
