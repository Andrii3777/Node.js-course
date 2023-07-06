"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.editItem = exports.addItem = exports.getItems = void 0;
const users_1 = require("./users");
const items = [];
let idCounter = 22;
function getItems(req, res) {
    // Filter items by user ID
    const userItems = items.filter((item) => (item === null || item === void 0 ? void 0 : item.userLogin) === (users_1.userLogin || 'guest'));
    res.json({ items: userItems });
}
exports.getItems = getItems;
;
function addItem(req, res) {
    const { text } = req.body;
    const newItem = {
        id: ++idCounter,
        text, checked: true,
        userLogin: users_1.userLogin || 'guest'
    };
    items.push(newItem);
    res.json({ id: newItem.id });
}
exports.addItem = addItem;
;
function editItem(req, res) {
    const { id, text, checked } = req.body;
    // Find item by id and update its properties
    const item = items.find((item) => item.id === id);
    if (item) {
        item.text = text;
        item.checked = checked;
        res.json({ ok: true });
    }
    else {
        res.status(404).json({ error: 'Item not found' });
    }
}
exports.editItem = editItem;
;
function deleteItem(req, res) {
    const { id } = req.body;
    // Find the index of the element by id and remove it from the array
    const index = items.findIndex((item) => item.id === id);
    if (index !== -1) {
        items.splice(index, 1);
        res.json({ ok: true });
    }
    else {
        res.status(404).json({ error: 'Item not found' });
    }
}
exports.deleteItem = deleteItem;
;
//# sourceMappingURL=crud.js.map