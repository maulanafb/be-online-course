import { Test, TestingModule } from '@nestjs/testing';
import { CourseGoalsController } from './course-goals.controller';
import { CourseGoalsService } from './course-goals.service';

describe('CourseGoalsController', () => {
  let controller: CourseGoalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseGoalsController],
      providers: [CourseGoalsService],
    }).compile();

    controller = module.get<CourseGoalsController>(CourseGoalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
