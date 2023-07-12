import { Request, Response } from 'express';
import { userLogin } from './users';

const items: { id: number; text: string; checked: boolean; userLogin: string }[] = [];
let idCounter = 22;

export function getItems(req: Request, res: Response) {
    // Filter items by user ID
    const userItems = items.filter((item) => item?.userLogin === (userLogin || 'guest'));

    res.json({ items: userItems });
};

export function addItem(req: Request, res: Response) {
    const { text } = req.body;
    const newItem = {
        id: ++idCounter,
        text, checked: true,
        userLogin: userLogin || 'guest'
    };
    items.push(newItem);

    res.json({ id: newItem.id });
};

export function editItem(req: Request, res: Response) {
    const { id, text, checked } = req.body;

    // Find item by id and update its properties
    const item = items.find((item) => item.id === id);
    if (item) {
        item.text = text;
        item.checked = checked;
        res.json({ ok: true });
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
};

export function deleteItem(req: Request, res: Response) {
    const { id } = req.body;

    // Find the index of the element by id and remove it from the array
    const index = items.findIndex((item) => item.id === id);
    if (index !== -1) {
        items.splice(index, 1);
        res.json({ ok: true });
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
};