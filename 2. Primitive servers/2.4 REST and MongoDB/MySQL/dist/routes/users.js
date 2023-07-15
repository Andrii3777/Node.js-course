"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoginValid = exports.register = exports.login = exports.logout = exports.userLogin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const MySQLConnect_1 = require("../MySQLConnect");
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
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { login, pass } = req.body;
            const query = 'SELECT * FROM user WHERE login = ?';
            MySQLConnect_1.connection.query(query, [login], (err, users) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                if (users.length === 0) {
                    return res.status(401).json({ error: 'not found' });
                }
                bcrypt_1.default.compare(pass, users[0].password, (err, result) => {
                    if (err) {
                        return res.status(500).json({ error: err });
                    }
                    if (result) {
                        exports.userLogin = login;
                        res.json({ ok: true });
                    }
                    else {
                        res.status(401).json({ error: 'Invalid credentials' });
                    }
                });
            });
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
exports.login = login;
;
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { login, pass } = req.body;
            if (!isLoginValid(login)) {
                return res.status(400).json({ error: 'Invalid login' });
            }
            const query = 'SELECT * FROM user WHERE login = ?';
            MySQLConnect_1.connection.query(query, [login], (err, users) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                if (users.length > 0) {
                    return res.status(409).json({ error: 'User already exists' });
                }
                const query = 'INSERT INTO user (login, password) VALUES (?, ?)';
                const hashPass = yield bcrypt_1.default.hash(pass, 10);
                exports.userLogin = login;
                MySQLConnect_1.connection.query(query, [login, hashPass], (err, result) => {
                    if (err) {
                        res.status(500).json({ error: err });
                    }
                    else {
                        res.json({ ok: true });
                    }
                });
            }));
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
exports.register = register;
;
function isLoginValid(email) {
    const regex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    return regex.test(email);
}
exports.isLoginValid = isLoginValid;
//# sourceMappingURL=users.js.map