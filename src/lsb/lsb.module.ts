import { Module } from '@nestjs/common';
import { LsbService } from './lsb.service';
import { LsbController } from './lsb.controller';
import { CaesarChiperService } from 'src/caesar-chiper/caesar-chiper.service';

@Module({
  controllers: [LsbController],
  providers: [LsbService, CaesarChiperService],
})
export class LsbModule {}
