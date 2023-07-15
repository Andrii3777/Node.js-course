import { Request, Response } from 'express';
import { userLogin } from './users';
import crypto from 'crypto';
import { ObjectId } from "mongodb";
import { client } from '../MongoConnect';

export async function getItems(req: Request, res: Response) {
  try {
    const items = client.db().collection('items');
    const userItems = await items
      .find({ userLogin: userLogin || 'guest' })
      .toArray();

    res.json({ items: userItems });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export async function addItem(req: Request, res: Response) {
  try {
    if (!req.body) return res.sendStatus(400);
    const { text } = req.body;

    const newItem = {
      id: new ObjectId(generateRandomString()),
      text: text,
      checked: true,
      userLogin: userLogin || 'guest'
    };

    const items = client.db().collection('items');
    await items.insertOne(newItem);
    res.json({ id: newItem.id });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export async function editItem(req: Request, res: Response) {
  try {
    if (!req.body) return res.sendStatus(400);
    const { id, text, checked } = req.body;
    const items = client.db().collection('items');

    await items.findOneAndUpdate({ id: new ObjectId(id) }, { $set: { text: text, checked: checked } });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export async function deleteItem(req: Request, res: Response) {
  try {
    const items = client.db().collection('items');
    const result = await items.findOneAndDelete({ id: new ObjectId(req.body.id) });

    if (result.value) { res.json({ ok: true }); }
    else { res.sendStatus(404); }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

function generateRandomString(): string {
  const randomBytes: Buffer = crypto.randomBytes(12);
  return randomBytes.toString('hex');
}