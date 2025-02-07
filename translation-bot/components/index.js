export const homeMenu = {
    reply_markup: {
        inline_keyboard: [
            [
                { text: 'ترجمه با گوگل', callback_data: 'google' },
                { text: 'ترجمه با مایکروسافت', callback_data: 'microsoft' },
                { text: 'ترجمه با یندکس', callback_data: 'yandex' },
            ],
        ],
    },
};

export const sourseLangMenu = {
    reply_markup: {
        inline_keyboard: [
            [
                { text: 'فارسی 🦁☀️', callback_data: 'fa' },
                { text: '🇺🇸 انگلیسی', callback_data: 'en' },
                { text: '🇸🇦 عربی', callback_data: 'ar' },
            ],
            [
                { text: '🇩🇪 آلمانی', callback_data: 'de' },
                { text: '🇮🇹 ایتالیایی', callback_data: 'it' },
                { text: '🇫🇷 فرانسوی', callback_data: 'fr' },
            ],
        ],
    },
};
