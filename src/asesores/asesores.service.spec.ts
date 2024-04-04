import { Test, TestingModule } from '@nestjs/testing';
import { AsesoresService } from './asesores.service';

describe('AsesoresService', () => {
  let service: AsesoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AsesoresService],
    }).compile();

    service = module.get<AsesoresService>(AsesoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
