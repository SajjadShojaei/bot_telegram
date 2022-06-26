import { Injectable } from '@nestjs/common';
import { GetDepossitAccountParamets } from 'src/shared/interfaces/getDepossitAccount.interface';

const api = require('kucoin-node-api')

const API_KEY = "62b805c6c57e070001fcff8c"
const SECRET_KEY = "a524debf-66b1-472b-bf99-7b649f6c5a0e"
const PASSPHRASE = "Sajjad_1414"

const config = {
    apiKey: API_KEY,
    secretKey: SECRET_KEY,
    passphrase: PASSPHRASE,
    environment: 'live'
  }
  
api.init(config)

@Injectable()
export class KucoinService {


    async getAccount(params: GetDepossitAccountParamets) {

        try {
            let r = await api.getAccounts()
            let s = await api.getDepositAddress(params)            
            return s
          } catch(err) {
            console.log(err)
          } 
    }

}
