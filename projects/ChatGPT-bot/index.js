import { Markup, Telegraf } from 'telegraf';
import redis from '../../utils/redis.js';
import { sendRequest } from './utils/sendRequest.js';
const bot = new Telegraf('7866634027:AAH2UNM9ka1_A4BK5bfnIWfcA5rUIcyMjFU');
bot.start((ctx) => {
    ctx.reply(
        'به ربات ChatGPT خوش اومدید!\n لطفا بگو میخوای از کدوم سرویس استفاده کنی',
        Markup.inlineKeyboard([
            Markup.button.callback('ChatGPT 3.5 Turbo', 'turbo'),
            Markup.button.callback('ChatGPT 4', 'GPT4'),
        ])
    );
});

bot.action('turbo', (ctx) => {
    const chatId = ctx.chat.id;
    redis.set(`user:${chatId}:engine`, 'gpt3.5-turbo', { EX: 180 });
    ctx.editMessageText('سلام!\n چه کمکی میتونم به شما بکنم؟');
});
bot.action('GPT4', (ctx) => {
    const chatId = ctx.chat.id;
    redis.set(`user:${chatId}:engine`, 'gpt4o', { EX: 180 });
    ctx.editMessageText('سلام!\n چه کمکی میتونم به شما بکنم؟');
});
bot.on('text', async (ctx) => {
    const chatId = ctx.chat.id;
    const text = ctx.text;

    const engine = await redis.get(`user:${chatId}:engine`);
    if (engine) {
        const data = await sendRequest({ content: text, engine });
        if (data.status == 200) {
            ctx.reply(data.result);
        } else {
            ctx.reply('مشکلی پیش آمده');
        }
    }
});
bot.launch();
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
