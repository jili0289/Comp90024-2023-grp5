FROM node:current-alpine

WORKDIR /app

COPY ./package-docker.json /app/package.json

RUN npm install

COPY ./public /app/public
COPY ./src /app/src

EXPOSE 3000

CMD npm start