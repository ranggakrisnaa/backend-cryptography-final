import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CaesarChiperModule } from './caesar-chiper/caesar-chiper.module';
import { LsbModule } from './lsb/lsb.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: '.env',
    }),
    CaesarChiperModule,
    LsbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
