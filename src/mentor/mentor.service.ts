import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMentorDto } from './dto/create-mentor.dto';
import { UpdateMentorDto } from './dto/update-mentor.dto';
import { PrismaService } from 'src/prisma.service';
import * as fs from 'fs';

// interface MulterFile {
//   fieldname: string;
//   originalname: string;
//   encoding: string;
//   mimetype: string;
//   size: number;
//   filename: string;
//   buffer: Buffer;
// }
@Injectable()
export class MentorService {
  constructor(private prismaService: PrismaService) {}

  async create(createMentorDto: CreateMentorDto, thumbnail) {
    const createMentor = await this.prismaService.mentor.create({
      data: {
        name: createMentorDto.name,
        thumbnail: thumbnail ? thumbnail.filename : null,
      },
    });

    return {
      data: createMentor,
      statusCode: HttpStatus.CREATED,
      message: 'successfully Create Mentor',
    };
  }

  async findAll() {
    const allMentor = await this.prismaService.mentor.findMany();

    return {
      data: allMentor,
      statusCode: HttpStatus.OK,
      message: 'Get All Mentors successfully',
    };
  }

  async findOne(id: string) {
    const checkMentor = await this.prismaService.mentor.findUnique({
      where: { id },
    });
    if (!checkMentor) throw new NotFoundException();
    return {
      data: checkMentor,
      statusCode: HttpStatus.OK,
      message: 'Find Mentor Success',
    };
  }

  async update(id: string, updateMentorDto: UpdateMentorDto, thumbnail) {
    const existingMentor = await this.prismaService.mentor.findUnique({
      where: { id },
    });

    if (!existingMentor) {
      throw new NotFoundException(`Mentor with ID ${id} not found`);
    }
    if (existingMentor.thumbnail) {
      const oldThumbnailPath = `public/upload/${existingMentor.thumbnail}`;
      if (fs.existsSync(oldThumbnailPath)) {
        fs.unlinkSync(oldThumbnailPath);
      }
    }
    let updatedThumbnail = existingMentor.thumbnail;

    // Check if a new thumbnail is provided
    if (thumbnail) {
      updatedThumbnail = thumbnail.filename;
    }
    console.log(updateMentorDto);
    const updatedMentor = await this.prismaService.mentor.update({
      where: { id },
      data: {
        ...updateMentorDto,
        thumbnail: updatedThumbnail,
      },
    });

    return {
      data: updatedMentor,
      statusCode: HttpStatus.OK,
      message: 'Update mentor success',
    };
  }

  async remove(id: string) {
    const check = await this.prismaService.mentor.findUnique({
      where: { id },
    });

    if (!check) {
      throw new NotFoundException(`Mentor with ID ${id} not found`);
    }

    const deleteMentor = await this.prismaService.mentor.delete({
      where: { id },
    });
    return {
      data: deleteMentor,
      statusCode: HttpStatus.OK,
      message: `Mentor ${deleteMentor.name} deleted successfully}`,
    };
  }
}
