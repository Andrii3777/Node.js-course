import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { client } from '../MongoConnect';

export let userLogin: string;

export function logout(req: Request, res: Response) {
    req.session.destroy(err => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.json({ ok: true });
        }
    });
};

export async function login(req: Request, res: Response) {
    try {
        const { login, pass } = req.body;
        const users = client.db().collection('users');
        // Check user’s existence and password
        const user = await users.findOne({ login: login });
        if (user) {
            // Compare password hash with entered password
            bcrypt.compare(pass, user.pass, (err, result) => {
                if (result) {
                    userLogin = login;
                    res.json({ ok: true });
                } else {
                    res.status(401).json({ error: 'Invalid credentials' });
                }
            });
        } else {
            res.status(401).json({ error: 'not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export async function register(req: Request, res: Response) {
    try {
        const { login, pass } = req.body;
        const users = client.db().collection('users');

        if (!isLoginValid(login)) {
            res.status(400).json({ error: 'Invalid login' });
            return;
        }

        // Check that there is no user with this login
        const userExists = await users.findOne({ login });
        if (userExists) {
            res.status(409).json({ error: 'User already exists' });
        } else {
            // Hashing the password before saving
            const hashPass = await bcrypt.hash(pass, 10);
            userLogin = login;
            await users.insertOne({ login, pass: hashPass });

            res.json({ ok: true });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export function isLoginValid(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    return regex.test(email);
}