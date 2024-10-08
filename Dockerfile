FROM node:20-alpine3.18 as builder

WORKDIR /app
COPY package*.json ./
# RUN npm install --production
RUN npm ci
COPY . .
COPY prisma ./prisma
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD [ "npm","run","start" ]