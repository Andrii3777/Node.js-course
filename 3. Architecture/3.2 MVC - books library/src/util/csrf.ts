import { Request, Response } from 'express';
import crypto from 'crypto';

export function generateCSRFToken() {
    return crypto.randomBytes(16).toString('hex');
}

export function validateCSRFToken(req: Request, res: Response) {
    const csrfCookie = req.cookies['XSRF-TOKEN'];
    const csrfFromBody = req.body._csrf;

    if (csrfCookie !== csrfFromBody) {
        res.status(403).json('CSRF Token Mismatch');
    }
}