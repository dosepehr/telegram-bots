const TelegramBot = require('node-telegram-bot-api');

const token = '7984012494:AAGa9jcfdpuxCzcHbcgB6EHw_FdDXVPw5eQ';

const bot = new TelegramBot(token, { polling: true });
const db = require('../utils/db');
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const inlineKeyboard = {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'دریافت عکس 🖼️', callback_data: '/photo' },
                    { text: 'دریافت آهنگ 🎵', callback_data: '/audio' },
                ],
                [{ text: '🫡 دریافت استیکر', callback_data: '/sticker' }],
            ],
        },
    };

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
