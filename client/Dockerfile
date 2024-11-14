FROM node:22-alpine

WORKDIR /client

COPY . .

RUN npm config set legacy-peer-deps true

RUN npm install

EXPOSE 5000

CMD ["npm", "run", "dev"]