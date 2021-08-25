FROM node:12.18

WORKDIR /app
COPY . /app

ARG REACT_APP_GOOGLE_CLIENTID="totally invalid.apps.googleusercontent.com"
ENV REACT_APP_GOOGLE_CLIENTID ${REACT_APP_GOOGLE_CLIENTID}

RUN npm install
RUN npm run build
RUN npm run doc
