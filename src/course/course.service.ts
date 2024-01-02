import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from 'src/prisma.service';
import slugify from 'slugify';
import * as fs from 'fs';

@Injectable()
export class CourseService {
  constructor(private prismaService: PrismaService) {}

  async create(createCourseDto: CreateCourseDto, thumbnail: any) {
    const slug = slugify(createCourseDto.name, { lower: true });
    const createCourse = await this.prismaService.course.create({
      data: {
        ...createCourseDto,
        thumbnail: thumbnail ? thumbnail.filename : null,
        slug: slug,
      },
    });
    console.log(createCourse);
    return {
      data: createCourse,
      statusCode: HttpStatus.CREATED,
      message: 'Course created successfully',
    };
  }
  async findAll() {
    const allCourse = await this.prismaService.course.findMany({
      include: {
        category: {
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
        category: {
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

  async update(id: string, updateCourseDto: UpdateCourseDto, thumbnail: any) {
    const existingCourse = await this.prismaService.course.findUnique({
      where: { id },
    });

    if (!existingCourse) {
      throw new NotFoundException(`Mentor with ID ${id} not found`);
    }
    if (existingCourse.thumbnail) {
      const oldThumbnailPath = `public/upload/${existingCourse.thumbnail}`;
      if (fs.existsSync(oldThumbnailPath)) {
        fs.unlinkSync(oldThumbnailPath);
      }
    }
    let updatedThumbnail = existingCourse.thumbnail;
    // Check if a new thumbnail is provided
    if (thumbnail) {
      updatedThumbnail = thumbnail.filename;
    }
    const updateCourse = await this.prismaService.course.update({
      where: {
        id: id,
      },
      data: { ...updateCourseDto, thumbnail: updatedThumbnail },
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
