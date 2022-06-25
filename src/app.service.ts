import { Injectable } from '@nestjs/common';
import { Action, Command, Hashtag, Hears, Help, Mention, On, Phone, Settings, Start, Update } from 'nestjs-telegraf';
import { Context, Markup } from 'telegraf';
import axios from 'axios';

let mainApiKey = '904df12a-9f80-4815-88e1-1b8cae0e0daf'

@Update()
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }



  @Start()
  async startCommand(ctx: Context) {
    await ctx.telegram.sendMessage(ctx.chat.id, `Welcome to my robot`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "Click Me", callback_data: "Hi" },
              { text: "Contact", callback_data: "contact" },
              { text: "About Me", callback_data: "about" },
              { text: "LivePrice", callback_data: "live_price" }
            ]
          ]
        }
      })
  }

  @Action('Hi')
  async seyHello(ctx: Context) {
    const name = ctx.from.first_name
    this.testfFunc(name).then(async (name) => {
      await ctx.telegram.sendMessage(ctx.chat.id, `Hi ${name} `,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "Go Back to Menu", callback_data: "go-back" }]
            ]
          }
        })
    })

  }

  @Action('contact')
  async contact(ctx: Context) {
    await ctx.telegram.sendMessage(ctx.chat.id, `You can contact me with phone number: +989332827748`,
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Go Back to Menu", callback_data: "go-back" }]
          ]
        }
      })
  }

  @Action('about')
  async about(ctx: Context) {
    await ctx.telegram.sendMessage(ctx.chat.id, `Hi there, My name is Sajjad Shojaei. Author this robot ^^`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "Go Back to Menu", callback_data: "go-back" }
            ]
          ]
        }
      })
  }
  @Action('live_price')
  async livePrice(ctx: Context) {
    await ctx.telegram.sendMessage(ctx.chat.id, `Select Your Symbol`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "Bitcoin", callback_data: "btc" },
              { text: "Ethereum", callback_data:"eth" },
              { text: "Binance Coin", callback_data:"bnb" },
              { text: "Go Back to Menu", callback_data: "go-back" }
            ]
          ]
        }
      })
  }

  @Action('btc')
  async bitcoinPrice(ctx: Context){
    const symbol = "BTC"
    await this.cmcDataSymbol(symbol).then(async (result) => {
      await ctx.telegram.sendMessage(ctx.chat.id, `${result} `,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "Go Back to Menu", callback_data: "go-back" }]
            ]
          }
        })
    })
  }

  @Action('eth')
  async ethereumPrice(ctx: Context){
    const symbol = "ETH"
    this.cmcDataSymbol(symbol).then(async (result) => {
      await ctx.telegram.sendMessage(ctx.chat.id, `${result} `,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "Go Back to Menu", callback_data: "go-back" }]
            ]
          }
        })
    })
  }

  @Action('bnb')
  async bnbPrice(ctx: Context){
    const symbol = "BNB"
    this.cmcDataSymbol(symbol).then(async (result) => {
      await ctx.telegram.sendMessage(ctx.chat.id, `${result} `,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "Go Back to Menu", callback_data: "go-back" }]
            ]
          }
        })
    })
  }

  @Action('go-back')
  async menu(ctx: Context) {
    await ctx.telegram.sendMessage(ctx.chat.id, `Welcome to my robot`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "Click Me", callback_data: "Hi" },
              { text: "Contact", callback_data: "contact" },
              { text: "About Me", callback_data: "about" }
            ]
          ]
        }
      })
  }

  async testfFunc(name: string) {
    return name
  }

  async cmcDataSymbol(symbol: string) {
    let url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol='
    let response = await axios.get(`${url}${symbol}`, {
      params: {
        convert: 'USDT'
      },
      headers: {
        'X-CMC_PRO_API_KEY': mainApiKey,
      },
    });
    const apiData = response.data.data

    return apiData
  }

  // @Help()
  // async helpCommand(ctx: Context) {
  //   await ctx.reply('Send me a sticker');
  // }

  // @On('sticker')
  // async onSticker(ctx: Context) {
  //   await ctx.reply('👍');
  // }

  // @Hears('hi')
  // async hearsHi(ctx: Context) {
  //   await ctx.reply('Hey there');
  // }

  // @Command('inline')
  // async inlineCommand(ctx: Context) {
  //   ctx.reply("Hi there!", {
  //     reply_markup: {
  //       inline_keyboard: [
  //         /* Inline buttons. 2 side-by-side */
  //         [{ text: "Button 1", callback_data: "btn-1" }, { text: "Button 2", callback_data: "btn-2" }],

  //         /* One button */
  //         [{ text: "Next", callback_data: "next" }],

  //         /* Also, we can have URL buttons. */
  //         [{ text: "Open in browser", url: "telegraf.js.org" }]
  //       ]
  //     }
  //   });
  // }

  // @Settings()
  // async settings(ctx: Context) {
  //   await ctx.reply('settings')
  // }

  // @Mention('sajji')
  // async mention(ctx: Context) {
  //   ctx.reply('hi there')
  // }

  // @Phone('09332827748')
  // async phone(ctx: Context) {
  //   await ctx.reply('this is my phone number')
  // }

  // @Hashtag('programmer')
  // async hashtag(ctx: Context) {
  //   await ctx.reply(`yes I'm programmer`)
  // }

}
