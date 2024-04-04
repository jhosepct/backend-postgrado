import { Test, TestingModule } from '@nestjs/testing';
import { ExpeditosService } from './expeditos.service';

describe('ExpeditosService', () => {
  let service: ExpeditosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpeditosService],
    }).compile();

    service = module.get<ExpeditosService>(ExpeditosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
