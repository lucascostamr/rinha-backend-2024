FROM node:21.6.1-alpine3.19
WORKDIR /app
COPY package* .
CMD ["sh", "-c", "npm i && sh"]