const mysql = require('mysql');

const config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'translation-bot',
};

const db = mysql.createConnection(config);

db.connect((err) => {
    if (err) console.log('Err in db connection', err.stack);
    else console.log('Db connected');
});

module.exports = db;
