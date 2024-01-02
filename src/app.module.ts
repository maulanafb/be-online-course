import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { CategoryModule } from './category/category.module';
import { CourseModule } from './course/course.module';
import { MentorModule } from './mentor/mentor.module';
import { OrderModule } from './order/order.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CourseGoalsModule } from './course-goals/course-goals.module';
import { ChapterModule } from './chapter/chapter.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    UserModule,
    AuthModule,
    CategoryModule,
    CourseModule,
    MentorModule,
    OrderModule,
    CourseGoalsModule,
    ChapterModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
