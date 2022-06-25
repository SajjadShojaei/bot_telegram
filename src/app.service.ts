import { Injectable } from '@nestjs/common';
import { Command, Hashtag, Hears, Help, Mention, On, Phone, Settings, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  @Start()
  async startCommand(ctx: Context) {
    await ctx.setChatMenuButton()
    await ctx.reply(`Welcome ${ctx.from.first_name}`);
  }
  @Help()
  async helpCommand(ctx: Context) {
    await ctx.reply('Send me a sticker');
  }

  @On('sticker')
  async onSticker(ctx: Context) {
    await ctx.reply('👍');
  }

  @Hears('hi')
  async hearsHi(ctx: Context) {
    await ctx.reply('Hey there');
  }

  @Command('inline')
  async inlineCommand(ctx: Context){
    ctx.reply("Hi there!", {
      reply_markup: {
        inline_keyboard: [
          /* Inline buttons. 2 side-by-side */
          [{ text: "Button 1", callback_data: "btn-1" }, { text: "Button 2", callback_data: "btn-2" }],
  
          /* One button */
          [{ text: "Next", callback_data: "next" }],
  
          /* Also, we can have URL buttons. */
          [{ text: "Open in browser", url: "telegraf.js.org" }]
        ]
      }
    });
  }

  @Settings()
  async settings(ctx: Context) {
    await ctx.reply('settings')
  }

  @Mention('sajji')
  async mention(ctx: Context){
    ctx.reply('hi there')
  }

  @Phone('09332827748')
  async phone(ctx: Context){
    await ctx.reply('this is my phone number')
  }

  @Hashtag('programmer')
  async hashtag(ctx:Context){
    await ctx.reply(`yes I'm programmer`)
  }

}
