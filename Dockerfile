FROM node:21.6.1-alpine3.19
WORKDIR /app
COPY . .
EXPOSE 3000
CMD ["sh", "-c", "npm i && npm start"]