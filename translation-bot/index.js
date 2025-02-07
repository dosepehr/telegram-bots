import TelegramBot from 'node-telegram-bot-api';
import mysql from '../utils/mysql.js';
import redis from '../utils/redis.js';
import { homeMenu, sourceLangMenu } from './components/index.js';
import { sendKeyboard } from './utils/index.js';

const token = '7984012494:AAGa9jcfdpuxCzcHbcgB6EHw_FdDXVPw5eQ';

const bot = new TelegramBot(token, { polling: true });
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(
        chatId,
        'به ربات ما خوش اومدید!\n لطفا موتور جستجوی مدنظرتون رو انتخاب کنید 🤖',
        homeMenu
    );
});

bot.on('callback_query', (query) => {
    const chatId = query.from.id;
    const command = query.data;
    const messageId = query.message.message_id;

    if (command == 'google') {
        sendKeyboard({
            bot,
            redis,
            chatId,
            command,
            field: 'engine',
            keyboard: sourceLangMenu.reply_markup,
            messageId,
            text:"ممنون!\n حالا زبان مبدا رو برای ترجمه انتخاب کن"
        });
    }
    if (command == 'fa') {
        redis.set(`user:${chatId}:lang`, command);
        bot.sendMessage(chatId, 'okkkkk');
    }
});
