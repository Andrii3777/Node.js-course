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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.editItem = exports.addItem = exports.getItems = void 0;
const users_1 = require("./users");
const MySQLConnect_1 = require("../MySQLConnect");
function getItems(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = 'SELECT * FROM item WHERE userLogin = ?';
            MySQLConnect_1.connection.query(query, [users_1.userLogin || 'guest'], (err, items, fields) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.json({ items: items });
            });
        }
        catch (error) {
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
            const query = 'INSERT INTO item (text, checked, userLogin) VALUES (?, ?, ?)';
            const itemData = [text, true, users_1.userLogin || 'guest'];
            MySQLConnect_1.connection.query(query, itemData, (err, item, fields) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.json({ id: item.insertId });
            });
        }
        catch (error) {
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
            console.log('editItem:', { id, text, checked });
            const query = 'UPDATE item SET text = ?, checked = ? WHERE id = ?';
            const updatedItemData = [text, checked, id];
            MySQLConnect_1.connection.query(query, updatedItemData, (err, result, fields) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.json({ ok: true });
            });
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
exports.editItem = editItem;
;
function deleteItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.body;
            MySQLConnect_1.connection.query(`DELETE FROM item WHERE id = ?`, [id], (err, result, fields) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.json({ ok: true });
            });
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
exports.deleteItem = deleteItem;
;
//# sourceMappingURL=crud.js.map