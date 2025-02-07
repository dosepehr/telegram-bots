import TelegramBot from 'node-telegram-bot-api';
import {
    homeMenu,
    sourceLangMenu,
    targetLangMenu,
} from './components/index.js';
import { sendKeyboard } from './utils/index.js';
import redis from '../utils/redis.js';
import { sendRequest } from './utils/sendRequest.js';
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
    const translateSourceLanguages = ['fa', 'en', 'ar', 'de', 'it', 'fr'];
    const translateTargetLanguage = [
        'fa-t',
        'en-t',
        'ar-t',
        'de-t',
        'it-t',
        'ft-2',
    ];
    if (translateEngines.includes(command)) {
        sendKeyboard({
            bot,
            chatId,
            command,
            field: 'engine',
            messageId,
            text: 'ممنون!\n حالا زبان مبدا رو برای ترجمه انتخاب کن',
            keyboard: sourceLangMenu,
        });
    }
    if (translateSourceLanguages.includes(command)) {
        sendKeyboard({
            bot,
            chatId,
            command,
            field: 'source',
            messageId,
            text: 'ایول!\n حالا زبان مقصدت رو مشخص کن',
            keyboard: targetLangMenu,
        });
    }
    if (translateTargetLanguage.includes(command)) {
        sendKeyboard({
            bot,
            chatId,
            command,
            field: 'target',
            messageId,
            text: 'ممنون\n این دیگه مرحله آخره،متنی که قراره ترجمه بشه رو بنویس',
        });
    }
});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    const messageId = msg.message_id;
    if (!text.startsWith('/')) {
        const engine = await redis.get(`user:${chatId}:engine`);
        const source = await redis.get(`user:${chatId}:source`);
        const target = await redis.get(`user:${chatId}:target`);
        if (engine && source && target) {
            const data = await sendRequest({ source, engine, target, text });
            if (data.status == 200) {
                bot.sendMessage(
                    chatId,
                    `ممنون! این ترجمه پیام شماست
                    ${data.result}
                    `
                );
            } else {
                bot.sendMessage(chatId, 'مشکلی هست!');
            }
        }
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
