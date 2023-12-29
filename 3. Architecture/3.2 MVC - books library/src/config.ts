import * as dotenv from 'dotenv';
dotenv.config();

export const env = {
    APP_PORT: Number(process.env.APP_PORT),
    LIBRARY_HOST: process.env.LIBRARY_HOST as string,

    MYSQL_ROOT_PASSWORD: process.env.MYSQL_ROOT_PASSWORD as string,
    MYSQL_DATABASE: process.env.MYSQL_DATABASE as string,
    MYSQL_HOST: process.env.MYSQL_HOST as string,
    MYSQL_PORT: Number(process.env.MYSQL_PORT),
    MYSQL_USERNAME: process.env.MYSQL_USERNAME as string,
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD as string,

    NGINX_PORT: Number(process.env.NGINX_PORT),
    NGINX_HTTPS_PORT: Number(process.env.NGINX_HTTPS_PORT),

    MYSQL_LIMIT: Number(process.env.MYSQL_LIMIT),
    MYSQL_OFFSET: Number(process.env.MYSQL_OFFSET),
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD as string
};

export default env;