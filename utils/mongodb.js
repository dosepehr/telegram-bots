import mongoose from 'mongoose';
const DB_URI = 'mongodb://127.0.0.1:27017/chatgpt-bot';
const db = mongoose
    .connect(DB_URI)
    .then(() => console.log('DB Connected!'))
    .catch((err) => console.log('db connection error : ', err));

export default db;
