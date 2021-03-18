FROM node:10.13

WORKDIR /app
COPY . /app

RUN npm install
RUN npm run build
RUN npm run doc