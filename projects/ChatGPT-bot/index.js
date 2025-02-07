import { Markup, Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';

const bot = new Telegraf('7866634027:AAH2UNM9ka1_A4BK5bfnIWfcA5rUIcyMjFU');
bot.start((ctx) => {
    ctx.reply(
        'Welcome',
        Markup.inlineKeyboard([Markup.button.callback('Help me', 'help')])
    );
});
bot.action('help', async (ctx) => {
    await ctx.replyWithDice('Send me a sticker');
});
bot.on(message('sticker'), (ctx) => ctx.reply('👍'));
bot.hears('/hi', (ctx) => ctx.reply('Hey there'));
bot.launch();
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
