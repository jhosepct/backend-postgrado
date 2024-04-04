import { Test, TestingModule } from '@nestjs/testing';
import { AsesoresController } from './asesores.controller';

describe('AsesoresController', () => {
  let controller: AsesoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AsesoresController],
    }).compile();

    controller = module.get<AsesoresController>(AsesoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
