import TelegramBot from 'node-telegram-bot-api';
import mysql from '../utils/mysql.js';
import redis from '../utils/redis.js'
import { homeMenu } from './components/index.js';

const token = '7984012494:AAGa9jcfdpuxCzcHbcgB6EHw_FdDXVPw5eQ';

const bot = new TelegramBot(token, { polling: true });
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const inlineKeyboard = homeMenu;

    bot.sendMessage(chatId, 'به ربات ما خوش اومدید!\n لطفا موتور جستجوی مدنظرتون رو انتخاب کنید 🤖', inlineKeyboard);
});

bot.on('callback_query', (query) => {
    const chatId = query.from.id;
    const command = query.data;

});
