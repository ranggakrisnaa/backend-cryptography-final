import { Test, TestingModule } from '@nestjs/testing';
import { CaesarChiperController } from './caesar-chiper.controller';
import { CaesarChiperService } from './caesar-chiper.service';

describe('CaesarChiperController', () => {
  let controller: CaesarChiperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CaesarChiperController],
      providers: [CaesarChiperService],
    }).compile();

    controller = module.get<CaesarChiperController>(CaesarChiperController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
