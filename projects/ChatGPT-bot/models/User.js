import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
    {
        chatId: {
            type: Number,
        },
        requests: {
            type: Number,
            default: 1,
        },

        user: {
            is_bot: {
                type: Boolean,
            },
            first_name: {
                type: String,
            },
            last_name: {
                type: String,
            },
            username: {
                type: String,
            },
            language_code: {
                type: String,
            },
            is_premium: {
                type: Boolean,
                default: false,
            },
        },
        isPremium: {
            type: Boolean,
            default: false,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    }
);
const User = mongoose.model('User', userSchema);

export default User;
