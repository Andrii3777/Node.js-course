# <div align="center">SHPP LIBRARY</div>

## Environment Variables

The following environment variables should be defined in your `.env` file:

### Application Configuration
- **APP_PORT**: The port on which your application will listen. Set it to `3000` for example.
- **API_VERSION**: The version of your application.

### MySQL Configuration
- **MYSQL_ROOT_PASSWORD**: The root password for your MySQL database. Set it to `pass` for docker.
- **MYSQL_DATABASE**: The name of the MySQL database. Set it to `library` for docker.
- **MYSQL_HOST**: The host where your MySQL server is running. Set it to `mysql_library` for docker.
- **MYSQL_PORT**: The port on which your MySQL server is listening. Set it to `3306` for docker.
- **MYSQL_USERNAME**: The username for MySQL database access. Set it to `user` for docker.
- **MYSQL_PASSWORD**: The password for MySQL database access. Set it to `user` for docker.

### Pagination settings
- **MYSQL_LIMIT**: The maximum number of rows of data to return as a result of the query.
- **MYSQL_OFFSET**: The offset from which the returned rows of data should start.
- **ADMIN_PASSWORD**: The password for admin page access.

### NGINX Ports
- **NGINX_PORT**: The default HTTP port for NGINX. Set it to `80`.
- **NGINX_HTTPS_PORT**: The default HTTPS port for NGINX. Set it to `443`.

## Api Reference
[http://localhost:3000/api/v1/]

## Running the app with DOCKER
## Installation first time only!

```bash
# create .env file and define all environment variables copyvariables

# run the docker containers with mysql and star-wars-app
$ docker-compose up -d

```

## Running the app (without DOCKER)
## Installation first time only!
```bash
# create .env file and define all environment variables copyvariables and install the dependencies
$ npm install

```

## Running the app

```bash
# run the docker containers with mysql and library-app
$ docker-compose up -d

# run the docker containers with mysql and library-app
# and rebuild images if they have changed
$ docker-compose up -d --build

# watch mode
$ node dist/index.js
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
$ docker exec -it mysql_library mysql -u user -p

# enter the MYSQL_PASSWORD: The password for MySQL database access
$ user

# OR to connect as a root user
$ docker exec -it mysql_library mysql -u root -p

# enter the MYSQL_ROOT_PASSWORD: The password for MySQL database access as root
$ pass

# to show all databases
$ show databases;

# to work with our database
$ use library;

# to show all tables in our database
$ show tables;

# to show data in a table, for instance "film"
$ select * from film;
```