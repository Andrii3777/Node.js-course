"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.editItem = exports.addItem = exports.getItems = void 0;
const users_1 = require("./users");
const fs_1 = __importDefault(require("fs"));
const async_mutex_1 = require("async-mutex");
const ITEMS_FILE_PATH = 'files/items.txt';
let items = [];
const mutex = new async_mutex_1.Mutex(); // Создаем мьютекс
if (fs_1.default.existsSync(ITEMS_FILE_PATH)) {
    items = JSON.parse(fs_1.default.readFileSync(ITEMS_FILE_PATH, 'utf-8'));
}
let idCounter = items.length > 0 ? items[items.length - 1].id : 22;
function getItems(req, res) {
    const userItems = items.filter((item) => (item === null || item === void 0 ? void 0 : item.userLogin) === (users_1.userLogin || 'guest'));
    res.json({ items: userItems });
}
exports.getItems = getItems;
;
function addItem(req, res) {
    const { text } = req.body;
    mutex.acquire().then((release) => {
        // Захватываем мьютекс перед доступом к общим данным
        const newItem = {
            id: ++idCounter,
            text,
            checked: true,
            userLogin: users_1.userLogin || 'guest'
        };
        items.push(newItem);
        fs_1.default.writeFileSync(ITEMS_FILE_PATH, JSON.stringify(items), 'utf-8');
        release(); // Освобождаем мьютекс после завершения операций
        res.json({ id: newItem.id });
    });
}
exports.addItem = addItem;
;
function editItem(req, res) {
    const { id, text, checked } = req.body;
    mutex.acquire().then((release) => {
        const item = items.find((item) => item.id === id);
        if (item) {
            item.text = text;
            item.checked = checked;
            fs_1.default.writeFileSync(ITEMS_FILE_PATH, JSON.stringify(items), 'utf-8');
            res.json({ ok: true });
        }
        else {
            res.status(404).json({ error: 'Item not found' });
        }
        release();
    });
}
exports.editItem = editItem;
;
function deleteItem(req, res) {
    const { id } = req.body;
    mutex.acquire().then((release) => {
        const index = items.findIndex((item) => item.id === id);
        if (index !== -1) {
            items.splice(index, 1);
            fs_1.default.writeFileSync(ITEMS_FILE_PATH, JSON.stringify(items), 'utf-8');
            res.json({ ok: true });
        }
        else {
            res.status(404).json({ error: 'Item not found' });
        }
        release();
    });
}
exports.deleteItem = deleteItem;
;
//# sourceMappingURL=crud.js.map