import express from 'express';
import {getItems, addItem, editItem, deleteItem} from '../routes/crud';
import {login, logout, register} from '../routes/users';

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/register", register);
router.route('/items')
    .get(getItems)
    .post(addItem)
    .put(editItem)
    .delete(deleteItem);

export default router;