import basicAuth from 'express-basic-auth';
import env from '../config';

export const auth = basicAuth({
    users: { 'admin': env.ADMIN_PASSWORD },
    unauthorizedResponse: 'Unauthorized',
    challenge: true,
});