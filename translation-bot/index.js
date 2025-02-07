import TelegramBot from 'node-telegram-bot-api';
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

    const translateEngines = ['google', 'microsoft', 'yandex'];
    const translateLanguages = ['fa', 'en', 'ar', 'de', 'it', 'fr'];

    if (translateEngines.includes(command)) {
        sendKeyboard({
            bot,
            chatId,
            command,
            field: 'engine',
            keyboard: sourceLangMenu,
            messageId,
            text: 'ممنون!\n حالا زبان مبدا رو برای ترجمه انتخاب کن',
        });
    }
    if (translateLanguages.includes(command)) {
        sendKeyboard({
            bot,
            chatId,
            command,
            field: 'source',
            messageId,
            text: 'عالیه!\n حالا متنی رو که میخوای ترجمه کنی بنویس',
        });
    }
});

bot.on('polling_error', (error) => {
    console.log('Polling Error: ', error);
});
bot.on('webhook_error', (error) => {
    console.log('WebHook Error: ', error);
});
bot.on('error', (error) => {
    console.log('General Error: ', error);
});
