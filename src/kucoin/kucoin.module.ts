import { Module } from '@nestjs/common';
import { KucoinService } from './kucoin.service';
import { KucoinController } from './kucoin.controller';

@Module({
  providers: [KucoinService],
  controllers: [KucoinController]
})
export class KucoinModule {}
