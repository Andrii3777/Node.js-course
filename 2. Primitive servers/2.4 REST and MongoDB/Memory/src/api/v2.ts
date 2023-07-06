import express, { Request, Response } from 'express';
import {getItems, addItem, editItem, deleteItem} from '../routes/crud';
import {login, logout, register} from '../routes/users';

const router = express.Router();

router.post('/router', (req: Request, res: Response) => {
    const actions: { [key: string]: Function } = {
        'login': login,
        'logout': logout,
        'register': register,
        'getItems': getItems,
        'createItem': addItem,
        'editItem': editItem,
        'deleteItem': deleteItem
    };

    const handler = actions[req.query.action as string];
    handler ? handler(req, res) : res.status(400).json({ error: 'Invalid action' });
});

export default router;