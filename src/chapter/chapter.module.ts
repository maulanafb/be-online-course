import { Module } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { ChapterController } from './chapter.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ChapterController],
  providers: [ChapterService, PrismaService],
})
export class ChapterModule {}
