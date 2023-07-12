import { Request, Response } from 'express';
import { userLogin } from './users';
import fs from 'fs';
import { Mutex } from 'async-mutex';

const ITEMS_FILE_PATH = 'files/items.txt';
let items: { id: number; text: string; checked: boolean; userLogin: string }[] = [];
const mutex = new Mutex(); // Создаем мьютекс

if (fs.existsSync(ITEMS_FILE_PATH)) {
  items = JSON.parse(fs.readFileSync(ITEMS_FILE_PATH, 'utf-8'));
}

let idCounter = items.length > 0 ? items[items.length - 1].id : 22;

export function getItems(req: Request, res: Response) {
  const userItems = items.filter((item) => item?.userLogin === (userLogin || 'guest'));
  res.json({ items: userItems });
};

export function addItem(req: Request, res: Response) {
  const { text } = req.body;

  mutex.acquire().then((release) => {
    // Захватываем мьютекс перед доступом к общим данным

    const newItem = {
      id: ++idCounter,
      text,
      checked: true,
      userLogin: userLogin || 'guest'
    };
    items.push(newItem);
    fs.writeFileSync(ITEMS_FILE_PATH, JSON.stringify(items), 'utf-8');

    release(); // Освобождаем мьютекс после завершения операций

    res.json({ id: newItem.id });
  });
};

export function editItem(req: Request, res: Response) {
  const { id, text, checked } = req.body;

  mutex.acquire().then((release) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      item.text = text;
      item.checked = checked;
      fs.writeFileSync(ITEMS_FILE_PATH, JSON.stringify(items), 'utf-8');
      res.json({ ok: true });
    } else {
      res.status(404).json({ error: 'Item not found' });
    }

    release();
  });
};

export function deleteItem(req: Request, res: Response) {
  const { id } = req.body;

  mutex.acquire().then((release) => {
    const index = items.findIndex((item) => item.id === id);
    if (index !== -1) {
      items.splice(index, 1);
      fs.writeFileSync(ITEMS_FILE_PATH, JSON.stringify(items), 'utf-8');
      res.json({ ok: true });
    } else {
      res.status(404).json({ error: 'Item not found' });
    }

    release();
  });
};
