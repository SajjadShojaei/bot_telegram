import { Body, Controller, Get } from '@nestjs/common';
import { GetDepossitAccountParamets } from 'src/shared/interfaces/getDepossitAccount.interface';
import { KucoinService } from './kucoin.service';

@Controller('kucoin')
export class KucoinController {
    constructor(
        private readonly kucoinService:KucoinService
    ){}

    @Get('account')
    async getAccointInfo(@Body() params: GetDepossitAccountParamets){
        return await this.kucoinService.getAccount(params)
    }
}
