import mysql from 'mysql2';
import env from '../config';

export const mysqlOptions = {
    host: env.MYSQL_HOST,
    user: env.MYSQL_USER,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DATABASE
}

export const pool = mysql.createPool({
    connectionLimit: 5,
    ...mysqlOptions,
    multipleStatements: false
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to MySQL successfully!');
        connection.release();
    }
});

// OR
/*
export let connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'mysqldblibrary'
});

connection.connect(function (err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL successfully!');
}); */