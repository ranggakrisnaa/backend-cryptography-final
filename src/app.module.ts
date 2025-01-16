import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CaesarChiperModule } from './caesar-chiper/caesar-chiper.module';
import { LsbModule } from './lsb/lsb.module';

@Module({
  imports: [CaesarChiperModule, LsbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
