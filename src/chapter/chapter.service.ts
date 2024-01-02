import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChapterService {
  constructor(private prismaService: PrismaService) {}
  async create(createChapterDto: CreateChapterDto) {
    const createChapter = await this.prismaService.chapter.create({
      data: createChapterDto,
    });

    return {
      data: createChapter,
      statusCode: HttpStatus.CREATED,
      message: 'Chapter created',
    };
  }

  async findAll() {
    const allChapter = await this.prismaService.chapter.findMany();
    return {
      data: allChapter,
      statusCode: HttpStatus.OK,
      message: 'All Chapter',
    };
  }

  async findOne(id: string) {
    const chapter = await this.prismaService.chapter.findUnique({
      where: { id },
    });

    if (!chapter) throw new NotFoundException();
    return {
      data: chapter,
      statusCode: HttpStatus.OK,
      message: 'Chapter Fetch Successfully',
    };
  }

  async update(id: string, updateChapterDto: UpdateChapterDto) {
    const updateChapter = await this.prismaService.chapter.update({
      where: { id },
      data: updateChapterDto,
    });
    return {
      data: updateChapter,
      statusCode: HttpStatus.OK,
      message: 'Chapter updated successfully',
    };
  }

  async remove(id: string) {
    const deleteChapter = await this.prismaService.chapter.delete({
      where: { id },
    });

    return {
      data: deleteChapter,
      statusCode: HttpStatus.OK,
      message: 'Chapter deleted successfully',
    };
  }
}
