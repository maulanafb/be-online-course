import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LessonService {
  constructor(private prismaService: PrismaService) {}
  async create(createLessonDto: CreateLessonDto) {
    const createLesson = await this.prismaService.lesson.create({
      data: createLessonDto,
    });
    return {
      data: createLesson,
      statusCode: HttpStatus.CREATED,
      message: 'Lesson created successfully',
    };
  }

  async findAll() {
    const lessons = await this.prismaService.lesson.findMany();
    return {
      lessons,
    };
  }

  async findOne(id: string) {
    const lesson = await this.prismaService.lesson.findUnique({
      where: { id },
    });

    return {
      data: lesson,
      statusCode: HttpStatus.OK,
      message: 'successfully found lesson',
    };
  }

  async update(id: string, updateLessonDto: UpdateLessonDto) {
    const updateLesson = await this.prismaService.lesson.update({
      where: { id },
      data: updateLessonDto,
    });
    return {
      data: updateLesson,
      statusCode: HttpStatus.OK,
      message: 'Course Successfully updated',
    };
  }

  async remove(id: string) {
    const deleteLesson = await this.prismaService.lesson.delete({
      where: { id },
    });
    return {
      data: deleteLesson,
      statusCode: HttpStatus.OK,
      message: 'course deleted',
    };
  }
}
