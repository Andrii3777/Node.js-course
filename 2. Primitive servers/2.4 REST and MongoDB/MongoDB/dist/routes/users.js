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
const MongoConnect_1 = require("../MongoConnect");
function logout(req, res) {
    console.log('LOGOUT');
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
            console.log('LOGIN');
            const { login, pass } = req.body;
            const users = MongoConnect_1.client.db().collection('users');
            // Check user’s existence and password
            const user = yield users.findOne({ login: login });
            if (user) {
                console.log("USER", user);
                console.log("USER pass", user.pass);
                console.log("Input pass", pass);
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
    });
}
exports.login = login;
;
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('REGISTER');
            const { login, pass } = req.body;
            const users = MongoConnect_1.client.db().collection('users');
            if (!isLoginValid(login)) {
                res.status(400).json({ error: 'Invalid login' });
                return;
            }
            // Check that there is no user with this login
            const userExists = yield users.findOne({ login });
            if (userExists) {
                res.status(409).json({ error: 'User already exists' });
            }
            else {
                // Hashing the password before saving
                const hashPass = yield bcrypt_1.default.hash(pass, 10);
                exports.userLogin = login;
                yield users.insertOne({ login, pass: hashPass });
                res.json({ ok: true });
            }
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