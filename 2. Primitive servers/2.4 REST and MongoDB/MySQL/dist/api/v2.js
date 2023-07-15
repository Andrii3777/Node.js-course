"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const crud_1 = require("../routes/crud");
const users_1 = require("../routes/users");
const router = express_1.default.Router();
router.post('/router', (req, res) => {
    const actions = {
        'login': users_1.login,
        'logout': users_1.logout,
        'register': users_1.register,
        'getItems': crud_1.getItems,
        'createItem': crud_1.addItem,
        'editItem': crud_1.editItem,
        'deleteItem': crud_1.deleteItem
    };
    const handler = actions[req.query.action];
    handler ? handler(req, res) : res.status(400).json({ error: 'Invalid action' });
});
exports.default = router;
//# sourceMappingURL=v2.js.map