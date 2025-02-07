export const homeMenu = {
    reply_markup: {
        inline_keyboard: [
            [
                { text: 'ترجمه با گوگل', callback_data: '/google' },
                { text: 'ترجمه با مایکروسافت', callback_data: '/microsoft' },
                { text: 'ترجمه با یندکس', callback_data: '/yandex' },
            ],
        ],
    },
};
