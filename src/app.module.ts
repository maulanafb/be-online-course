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

@Module({
  imports: [UserModule, AuthModule, CategoryModule, CourseModule, MentorModule, OrderModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
