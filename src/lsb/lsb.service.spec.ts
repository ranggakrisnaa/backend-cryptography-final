import { Test, TestingModule } from '@nestjs/testing';
import { LsbService } from './lsb.service';

describe('LsbService', () => {
  let service: LsbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LsbService],
    }).compile();

    service = module.get<LsbService>(LsbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
