FROM node:24.0-slim

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm ci

RUN npx prisma generate

RUN npx prisma migrate dev

RUN npm run build

CMD [ "npm", "run", "start:prod" ]
