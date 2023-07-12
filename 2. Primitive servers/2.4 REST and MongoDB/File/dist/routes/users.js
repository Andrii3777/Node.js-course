"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoginValid = exports.register = exports.login = exports.logout = exports.userLogin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const fs_1 = __importDefault(require("fs"));
const async_mutex_1 = require("async-mutex");
const USERS_FILE_PATH = 'files/users.txt';
let users = [];
const mutex = new async_mutex_1.Mutex(); // Создаем мьютекс
if (fs_1.default.existsSync(USERS_FILE_PATH)) {
    users = JSON.parse(fs_1.default.readFileSync(USERS_FILE_PATH, 'utf-8'));
}
function logout(req, res) {
    req.session.destroy(err => {
        if (err) {
            res.status(500).json({ error: err });
        }
        else {
            res.json({ ok: true });
        }
    });
}
exports.logout = logout;
;
function login(req, res) {
    const { login, pass } = req.body;
    try {
        // Check user’s existence and password
        const user = users.find((user) => user.login === login);
        if (user) {
            // Compare password hash with entered password
            bcrypt_1.default.compare(pass, user.pass, (err, result) => {
                if (result) {
                    exports.userLogin = login;
                    res.json({ ok: true });
                }
                else {
                    res.status(401).json({ error: 'Invalid credentials' });
                }
            });
        }
        else {
            res.status(401).json({ error: 'not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
exports.login = login;
;
function register(req, res) {
    const { login, pass } = req.body;
    if (!isLoginValid(login)) {
        res.status(400).json({ error: 'Invalid login' });
        return;
    }
    // Check that there is no user with this login
    const userExists = users.some((user) => user.login === login);
    if (userExists) {
        res.status(409).json({ error: 'User already exists' });
    }
    else {
        // Acquire the lock
        /* if (addUserLock) {
            res.status(503).json({ error: 'Service Unavailable' }); // В данный момент происходит добавление пользователя, поэтому возвращаем ошибку
            return;
        }
        addUserLock = true; */
        mutex.acquire().then((release) => {
            // Захватываем мьютекс перед доступом к общим данным
            // Hashing the password before saving
            bcrypt_1.default.hash(pass, 10, (err, hashPass) => {
                if (err) {
                    console.error('Internal server error');
                    res.status(500).json({ error: 'Internal server error' });
                }
                else {
                    exports.userLogin = login;
                    users.push({ login, pass: hashPass });
                    fs_1.default.writeFileSync(USERS_FILE_PATH, JSON.stringify(users), 'utf-8');
                    // Release the lock
                    /* addUserLock = false; */
                    release(); // Освобождаем мьютекс после завершения операций
                    res.json({ ok: true });
                }
            });
        });
    }
}
exports.register = register;
;
function isLoginValid(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
exports.isLoginValid = isLoginValid;
//# sourceMappingURL=users.js.map