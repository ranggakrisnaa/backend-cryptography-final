import { Module } from '@nestjs/common';
import { CaesarChiperService } from './caesar-chiper.service';
import { CaesarChiperController } from './caesar-chiper.controller';

@Module({
  controllers: [CaesarChiperController],
  providers: [CaesarChiperService],
})
export class CaesarChiperModule {}
