import { Test, TestingModule } from '@nestjs/testing';
import { CaesarChiperService } from './caesar-chiper.service';

describe('CaesarChiperService', () => {
  let service: CaesarChiperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CaesarChiperService],
    }).compile();

    service = module.get<CaesarChiperService>(CaesarChiperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
