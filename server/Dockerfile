FROM node:lts-buster-slim AS development

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

EXPOSE 8393

CMD [ "npm", "start" ]