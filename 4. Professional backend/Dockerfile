FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependecies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

RUN npm run build

EXPOSE ${APP_PORT}

CMD [ "npm", "run", "start:dev" ]