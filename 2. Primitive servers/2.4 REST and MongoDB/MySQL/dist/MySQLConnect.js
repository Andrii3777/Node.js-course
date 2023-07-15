"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const mysql_1 = __importDefault(require("mysql"));
exports.connection = mysql_1.default.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'mysqldbtodo'
});
exports.connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected to MySQL successfully!');
});
/* connection.query('SELECT * FROM user WHERE login = ?', ['usernew'], (err, res) => {
    if (err) {
        console.log('ERROR!');
        return;
    }
    console.log('SELECT * FROM users');
    if (res.length === 0) {
        console.log('true');
    }
    else {
        console.log('false');
    }
    console.log(res);
}); */
/* connection.query('SELECT * FROM item', (err, res, fields) => {
    if (err) {
        console.log('ERROR!');
        return;
    }
    console.log('SELECT * FROM item');
    console.log(res);
}); */
/* connection.query(`SELECT * FROM item WHERE userLogin = 'guest'`, (err, res, fields) => {
    if (err) {
        console.log('ERROR!');
        return;
    }
    console.log(`SELECT * FROM item WHERE userLogin = 'guest'`);
    const arr: [] = res[0].toArray();
    console.log(arr);
}); */
/*connection.query(`INSERT INTO item (text, checked, userLogin) VALUES (?, ?, ?)`, ['textN', true, "userLogin" || 'guest'], (err, res, fields) => {
    if (err) {
        console.log('ERROR!');
        return;
    }
    console.log(`INSERT`);
    console.log(res.insertId);
});

connection.query(`UPDATE item SET text = ?, checked = ? WHERE id = ?`, ['textN', true, 3], (err, res, fields) => {
    if (err) {
        console.log('ERROR!');
        return;
    }
    console.log(`UPDATE`);
    console.log(res);
});

connection.query(`DELETE FROM item WHERE id = 3`, (err, res, fields) => {
    if (err) {
        console.log('ERROR!');
        return;
    }
    console.log(`DELETE`);
    console.log(res);
}); */ 
//# sourceMappingURL=MySQLConnect.js.map