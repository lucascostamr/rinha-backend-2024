FROM node:21.6.1-alpine3.19
WORKDIR /app
COPY . .
CMD ["sh", "-c", "npm i && npm start"]