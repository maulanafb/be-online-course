import { Test, TestingModule } from '@nestjs/testing';
import { CourseGoalsService } from './course-goals.service';

describe('CourseGoalsService', () => {
  let service: CourseGoalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseGoalsService],
    }).compile();

    service = module.get<CourseGoalsService>(CourseGoalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
