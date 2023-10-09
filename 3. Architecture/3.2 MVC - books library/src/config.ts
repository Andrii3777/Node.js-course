import * as dotenv from 'dotenv';
dotenv.config();

export const env = {
    PORT: Number(process.env.PORT),
    LIBRARY_HOST: process.env.LIBRARY_HOST as string,

    MYSQL_HOST: process.env.MYSQL_HOST as string,
    MYSQL_USER: process.env.MYSQL_USER as string,
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD as string,
    MYSQL_DATABASE: process.env.MYSQL_DATABASE as string,

    MYSQL_LIMIT: Number(process.env.MYSQL_LIMIT),
    MYSQL_OFFSET: Number(process.env.MYSQL_OFFSET),
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD as string
};

export default env;