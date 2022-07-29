FROM node:16-alpine AS builder

WORKDIR /home/server

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

CMD ["npm", "run", "start:dev"]
