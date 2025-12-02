# Stage 1: Build the application
FROM node:24 AS builder

WORKDIR /usr/src/app
COPY . .
RUN  npm install
RUN npm run build
EXPOSE 3000

CMD ["npm", "run", "start:prod"]

# Stage 2: Setup the production environment
FROM node:alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY .env /usr/src/app/.env

EXPOSE 3000

CMD ["node","--env-file=.env","dist/main"]
