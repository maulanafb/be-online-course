import { Module } from '@nestjs/common';
import { CourseGoalsService } from './course-goals.service';
import { CourseGoalsController } from './course-goals.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CourseGoalsController],
  providers: [CourseGoalsService, PrismaService],
})
export class CourseGoalsModule {}
