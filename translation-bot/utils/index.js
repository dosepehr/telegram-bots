import redis from '../../utils/redis.js';
export const sendKeyboard = ({
    bot,
    chatId,
    messageId,
    command,
    text,
    field,
    keyboard,
}) => {
    redis.set(`user:${chatId}:${field}`, command);
    bot.editMessageText(text, {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: keyboard?.reply_markup || null,
    });
};