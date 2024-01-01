import { Category } from './entities/category.entity';
import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma.service';
import { NotFoundError } from 'rxjs';

@Injectable()
export class CategoryService {
  constructor(private prismaSerive: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const checkCategory = await this.prismaSerive.category.findUnique({
      where: {
        title: createCategoryDto.title,
      },
    });

    if (checkCategory) throw new ConflictException('Category duplicated');

    const category = await this.prismaSerive.category.create({
      data: createCategoryDto,
    });

    return {
      data: category,
      statusCode: HttpStatus.CREATED,
    };
  }

  async findAll() {
    const category = await this.prismaSerive.category.findMany();
    return {
      data: category,
      statusCode: HttpStatus.CREATED,
      message: 'All Category Found',
    };
  }

  async findOne(id: string) {
    const category = await this.prismaSerive.category.findUnique({
      where: {
        id: id,
      },
    });

    if (!category) throw new NotFoundException('No category');
    return {
      data: category,
      statusCode: HttpStatus.OK,
      message: 'Category found',
    };
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const updateCategory = await this.prismaSerive.category.update({
      data: updateCategoryDto,
      where: {
        id: id,
      },
    });

    if (!updateCategory) throw new NotFoundException();

    return {
      data: updateCategory,
      statusCode: HttpStatus.OK,
      message: 'Category updated successfully',
    };
  }

  async remove(id: string) {
    const deleteCategory = await this.prismaSerive.category.delete({
      where: {
        id: id,
      },
    });

    if (!deleteCategory) throw new NotFoundException();
    return {
      data: deleteCategory,
      statusCode: HttpStatus.OK,
      message: `Category ${deleteCategory.title} deleted successfully`,
    };
  }
}
