"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const crud_1 = require("../routes/crud");
const users_1 = require("../routes/users");
const router = express_1.default.Router();
router.post("/login", users_1.login);
router.post("/logout", users_1.logout);
router.post("/register", users_1.register);
router.route('/items')
    .get(crud_1.getItems)
    .post(crud_1.addItem)
    .put(crud_1.editItem)
    .delete(crud_1.deleteItem);
exports.default = router;
//# sourceMappingURL=v1.js.map