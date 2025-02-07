import TelegramBot from 'node-telegram-bot-api';
import mysql from '../utils/mysql.js';
import redis from '../utils/redis.js';
import { homeMenu, sourseLangMenu } from './components/index.js';

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
        redis.set(`user:${chatId}:action`, command);
        bot.editMessageText('ممنون!\n حالا زبان مبدا ترجمه رو انتخاب کنید', {
            chat_id: chatId,
            message_id: messageId,
            reply_markup: sourseLangMenu.reply_markup,
        });
    }
    if (command == 'fa') {
        redis.set(`user:${chatId}:lang`, command);
        bot.sendMessage(chatId, 'okkkkk');
    }
});
