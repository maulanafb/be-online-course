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
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CourseGoalsModule } from './course-goals/course-goals.module';
import { ChapterModule } from './chapter/chapter.module';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from './auth/guards/google.strategy';
import { LessonModule } from './lesson/lesson.module';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    CategoryModule,
    CourseModule,
    MentorModule,
    OrderModule,
    CourseGoalsModule,
    ChapterModule,
    LessonModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, GoogleStrategy],
})
export class AppModule {}
