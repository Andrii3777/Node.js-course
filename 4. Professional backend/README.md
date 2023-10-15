Environment Variables
The following environment variables should be defined in your .env file:

Application Configuration
APP_PORT: The port on which your application will listen. Set it to 3000.
MySQL Configuration
MYSQL_ROOT_PASSWORD: The root password for your MySQL database. Set it to root.
MYSQL_DATABASE: The name of the MySQL database. Set it to starwars.
MYSQL_HOST: The host where your MySQL server is running. Set it to 127.0.0.1.
MYSQL_PORT: The port on which your MySQL server is listening. Set it to 3306.
MYSQL_USERNAME: The username for MySQL database access. Set it to root.
MYSQL_PASSWORD: The password for MySQL database access. Set it to root.
MYSQL_SYNCHRONIZE: A flag indicating whether your application should synchronize with the database. Set it to false.
JSON Web Token (JWT) Configuration
JWT_SECRET: The secret key used to sign and verify JWT tokens. You should set this to a secure, secret value.
AWS S3 Configuration
AWS_ACCESS_KEY: Your AWS Access Key ID for accessing S3.
AWS_SECRET_ACCESS_KEY: Your AWS Secret Access Key for accessing S3.
AWS_S3_REGION: The AWS region where your S3 bucket is located. Set it to us-east-1.
AWS_S3_BUCKET: The name of the S3 bucket where your application will store files. Set it to nestjs-test37-uploader.

## Migrations

```bash
# Create tables
$ npm run tables:up

# Fill tables with seed data
$ npm run seeds:up

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```
