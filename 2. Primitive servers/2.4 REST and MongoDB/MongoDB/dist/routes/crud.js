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
exports.deleteItem = exports.editItem = exports.addItem = exports.getItems = void 0;
const users_1 = require("./users");
const crypto_1 = __importDefault(require("crypto"));
const mongodb_1 = require("mongodb");
const MongoConnect_1 = require("../MongoConnect");
function getItems(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const items = MongoConnect_1.client.db().collection('items');
            const userItems = yield items
                .find({ userLogin: users_1.userLogin || 'guest' })
                .toArray();
            res.json({ items: userItems });
        }
        catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
exports.getItems = getItems;
;
function addItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.body)
                return res.sendStatus(400);
            const { text } = req.body;
            const newItem = {
                id: new mongodb_1.ObjectId(generateRandomString()),
                text: text,
                checked: true,
                userLogin: users_1.userLogin || 'guest'
            };
            const items = MongoConnect_1.client.db().collection('items');
            yield items.insertOne(newItem);
            res.json({ id: newItem.id });
        }
        catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
exports.addItem = addItem;
;
function editItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.body)
                return res.sendStatus(400);
            const { id, text, checked } = req.body;
            const items = MongoConnect_1.client.db().collection('items');
            yield items.findOneAndUpdate({ id: new mongodb_1.ObjectId(id) }, { $set: { text: text, checked: checked } });
            res.json({ ok: true });
        }
        catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
exports.editItem = editItem;
;
function deleteItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const items = MongoConnect_1.client.db().collection('items');
            const result = yield items.findOneAndDelete({ id: new mongodb_1.ObjectId(req.body.id) });
            if (result.value) {
                res.json({ ok: true });
            }
            else {
                res.sendStatus(404);
            }
        }
        catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
exports.deleteItem = deleteItem;
;
function generateRandomString() {
    const randomBytes = crypto_1.default.randomBytes(12);
    return randomBytes.toString('hex');
}
//# sourceMappingURL=crud.js.map