import { Test, TestingModule } from '@nestjs/testing';
import { ExpeditosController } from './expeditos.controller';

describe('ExpeditosController', () => {
  let controller: ExpeditosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpeditosController],
    }).compile();

    controller = module.get<ExpeditosController>(ExpeditosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
