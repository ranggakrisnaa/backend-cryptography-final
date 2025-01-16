import { Module } from '@nestjs/common';
import { LsbService } from './lsb.service';
import { LsbController } from './lsb.controller';

@Module({
  controllers: [LsbController],
  providers: [LsbService],
})
export class LsbModule {}
