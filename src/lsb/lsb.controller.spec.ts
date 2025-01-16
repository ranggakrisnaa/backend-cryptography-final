import { Test, TestingModule } from '@nestjs/testing';
import { LsbController } from './lsb.controller';
import { LsbService } from './lsb.service';

describe('LsbController', () => {
  let controller: LsbController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LsbController],
      providers: [LsbService],
    }).compile();

    controller = module.get<LsbController>(LsbController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
