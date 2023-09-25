import mysql from 'mysql';

export let connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'mysqldbtodo'
});


/* connection.connect(function (err) {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL successfully!');
}); */
