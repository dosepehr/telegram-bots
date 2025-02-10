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
        username: {
            type: String,
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
