import mysql from 'mysql';
import * as dotenv from 'dotenv'
dotenv.config()

export const db = mysql.createConnection({
    host: process.env.APP_HOST || 'localhost',
    user: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE || 'facbook_social',
})

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});