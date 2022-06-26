import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KucoinModule } from './kucoin/kucoin.module';

@Module({
  imports: [TelegrafModule.forRoot({
    token: "5562754485:AAGcTieCymPtHra1J_SutueUFJvdCSL1ymI",
  }), KucoinModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
