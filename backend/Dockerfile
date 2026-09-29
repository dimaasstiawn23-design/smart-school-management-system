# Tahap 1: Build aplikasi
#FROM node:20-alpine AS builder

#WORKDIR /app

#COPY package*.json ./
#RUN npm install

#COPY . .
#RUN npm run build

# Tahap 2: Menjalankan aplikasi untuk production/development
#FROM node:20-alpine

#WORKDIR /app

#COPY package*.json ./
#RUN npm ci --only=production

#COPY --from=builder /app/dist ./dist

#EXPOSE 5000

#CMD ["node", "dist/main"]

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "start:dev"]