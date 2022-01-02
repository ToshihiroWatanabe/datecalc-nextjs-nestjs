FROM node:17.3

WORKDIR /app

COPY . .

RUN cd client && npm install
RUN cd server && npm install