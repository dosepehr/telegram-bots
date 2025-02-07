import TelegramBot from 'node-telegram-bot-api';
import db from '../utils/db.js';
import { homeMenu } from './components/index.js';

const token = '7984012494:AAGa9jcfdpuxCzcHbcgB6EHw_FdDXVPw5eQ';

const bot = new TelegramBot(token, { polling: true });
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const inlineKeyboard = homeMenu;

    bot.sendMessage(chatId, 'start command', inlineKeyboard);
});

bot.on('callback_query', (query) => {
    const chatId = query.from.id;
    const command = query.data;
    if (command == '/audio') {
        bot.sendAudio(chatId, 'assets/audio.mp3', {
            title: 'ای یار من',
            caption: 'آهنگ جدید شجریان',
        });
    }
    if (command == '/sticker') {
        bot.sendSticker(chatId, 'assets/sticker.webp');
    }
    if (command == '/photo') {
        bot.sendPhoto(chatId, 'assets/img.jpg');
    }
});
