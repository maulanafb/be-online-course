import {
  HttpStatus,
  Injectable,
  NotFoundException,
  Delete,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CourseService {
  constructor(private prismaService: PrismaService) {}

  async create(createCourseDto: CreateCourseDto) {
    const course = await this.prismaService.course.create({
      data: createCourseDto,
    });

    return {
      data: course,
      statusCode: HttpStatus.CREATED,
      message: 'Course created successfully',
    };
  }

  async findAll() {
    const allCourse = await this.prismaService.course.findMany({
      include: {
        Category: {
          select: {
            title: true,
          },
        },
      },
    });
    return {
      data: allCourse,
    };
  }

  async findOne(id: string) {
    const checkCourse = await this.prismaService.course.findUnique({
      where: {
        id: id,
      },
      include: {
        Category: {
          select: {
            title: true,
          },
        },
      },
    });

    if (!checkCourse) throw new NotFoundException();

    return {
      data: checkCourse,
      statusCode: HttpStatus.OK,
      message: 'Course Founded',
    };
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const updateCourse = await this.prismaService.course.update({
      where: {
        id: id,
      },
      data: updateCourseDto,
    });

    if (!updateCourse) throw new NotFoundException();
    return {
      data: updateCourse,
      statusCode: HttpStatus.OK,
      message: `Course updated`,
    };
  }

  async remove(id: string) {
    const deleteCourse = await this.prismaService.course.delete({
      where: {
        id: id,
      },
    });

    if (!deleteCourse) throw new NotFoundException();

    return {
      data: deleteCourse,
      statusCode: HttpStatus.OK,
      message: `Course deleted successfully`,
    };
  }
}
