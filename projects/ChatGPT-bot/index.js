import { Markup, Telegraf } from 'telegraf';
import redis from '../../utils/redis.js';
import { sendRequest } from './utils/sendRequest.js';
const bot = new Telegraf('7866634027:AAH2UNM9ka1_A4BK5bfnIWfcA5rUIcyMjFU');
import _ from '../../utils/mongodb.js';
import User from './models/User.js';
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

bot.action('end', (ctx) => {
    const chatId = ctx.chat.id;
    ctx.editMessageText('مکالمه به پایان رسید⛔');
    redis.del(`user:${chatId}:engine`);
});
bot.action('continue', (ctx) => {
    ctx.editMessageText('دیگه چه کمکی میتونم بهت بکنم؟');
});

bot.on('text', async (ctx) => {
    const chatId = ctx.chat.id;
    const text = ctx.text;

    const engine = await redis.get(`user:${chatId}:engine`);
    if (engine) {
        const data = await sendRequest({ content: text, engine });
        const user = ctx.update.message.from;
        const existingUser = await User.findOne({ chatId });
        if (existingUser) {
            if (existingUser.requests >= 5 && !existingUser.isPremium) {
                ctx.reply('برای ادامه دسترسی به ربات باید اکانت تهیه کنید');
                return;
            }
            existingUser.requests = existingUser.requests + 1;
            existingUser.save();
        } else {
            await User.create({
                chatId,
                user,
            });
        }
        ctx.reply('درخواست شما در حال پردازش است');
        if (data.status == 200) {
            ctx.reply(data.result);
            ctx.reply(
                'درخواست شما با موفقیت پردازش شد',
                Markup.inlineKeyboard([
                    Markup.button.callback('اتمام گفتگو', 'end'),
                    Markup.button.callback('ادامه گفتگو', 'continue'),
                ])
            );
        } else {
            ctx.reply('مشکلی پیش آمده');
        }
    } else {
        ctx.reply(
            'لطفا ابتدا موتور مورد نیاز خود را مشخص کنید',
            Markup.inlineKeyboard([
                Markup.button.callback('ChatGPT 3.5 Turbo', 'turbo'),
                Markup.button.callback('ChatGPT 4', 'GPT4'),
            ])
        );
    }
});

bot.launch();
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
