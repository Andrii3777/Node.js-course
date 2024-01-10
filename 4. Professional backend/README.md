# <div align="center">STAR-WARS APP</div>

## Environment Variables

The following environment variables should be defined in your `.env` file:

### Application Configuration
- **APP_PORT**: The port on which your application will listen. Set it to `3000` for example.

### MySQL Configuration
- **MYSQL_ROOT_PASSWORD**: The root password for your MySQL database. Set it to `pass` for docker.
- **MYSQL_DATABASE**: The name of the MySQL database. Set it to `starwars` for docker.
- **MYSQL_HOST**: The host where your MySQL server is running. Set it to `mysql` for docker.
- **MYSQL_PORT**: The port on which your MySQL server is listening. Set it to `3306` for docker.
- **MYSQL_USERNAME**: The username for MySQL database access. Set it to `user` for docker.
- **MYSQL_PASSWORD**: The password for MySQL database access. Set it to `user` for docker.
- **MYSQL_SYNCHRONIZE**: A flag indicating whether your application should synchronize with the database. Set it to `false`.

### JSON Web Token (JWT) Configuration
- **JWT_SECRET**: The secret key used to sign and verify JWT tokens. You should set this to a secure, secret value. Set it to `secret` for example.

### AWS S3 Configuration
- **AWS_ACCESS_KEY**: Your AWS Access Key ID for accessing S3.
- **AWS_SECRET_ACCESS_KEY**: Your AWS Secret Access Key for accessing S3.
- **AWS_S3_REGION**: The AWS region where your S3 bucket is located.
- **AWS_S3_BUCKET**: The name of the S3 bucket where your application will store files.

## Api Reference
In `development` Swagger documentation located at [http://localhost:3000/api]

## Running the app with DOCKER
### Installation first time only!

```bash
# create .env file and define all environment variables copyvariables

# run the docker containers with mysql and star-wars-app
$ docker-compose up -d

# enter the container to run the database migrations
$ docker exec -it starwars-app sh

# run the database migrations (create tables and fill tables with seed data)
$ npm run migration:run

```

## Running the app (without DOCKER)
### Installation first time only!
```bash
# create .env file and define all environment variables copyvariables and install the dependencies
$ npm install

# run the database migrations (create tables and fill tables with seed data)
$ npm run migration:run

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
# run the docker containers with mysql and star-wars-app
$ docker-compose up -d

# run the docker containers with mysql and star-wars-app
# and rebuild images if they have changed
$ docker-compose up -d --build

# development
$ npm run start

# watch mode
$ npm run start:dev
```


## Shutdown

```bash
# stop the app in the terminal where it is running
$ CTRL + C

# stop the docker containers with mysql and star-wars-app and all unnecessary volumes
$ docker-compose down -v
```


## Database MySQL
```bash
# connect to the MySQL server inside the container
$ docker exec -it mysql mysql -u user -p
$ docker exec -it mysql_starwars mysql -u user -p

# enter the MYSQL_PASSWORD: The password for MySQL database access
$ user

# OR to connect as a root user
$ docker exec -it mysql mysql -u root -p
$ docker exec -it mysql_starwars mysql -u root -p

# enter the MYSQL_ROOT_PASSWORD: The password for MySQL database access as root
$ pass

# to show all databases
$ show databases;

# to work with our database
$ use starwars;

# to show all tables in our database
$ show tables;

# to show data in a table, for instance "film"
$ select * from film;
```
