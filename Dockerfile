FROM node:23.11-slim

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN apt-get update -y && apt-get install -y openssl

RUN npx prisma generate

RUN npx prisma migrate dev

RUN npm run build

CMD [ "npm", "run", "start:prod" ]
