FROM node:5.5.0-wheezy

MAINTAINER hujb

RUN npm cache clean

RUN npm install -g cnpm --registry=https://r.cnpmjs.org

RUN npm install -g node-gyp

RUN npm install -g babel-cli

RUN npm install -g webpack

RUN mkdir -p /usr/src/app

COPY package.json /usr/src/app

WORKDIR /usr/src/app

RUN npm install

COPY . /usr/src/app

WORKDIR /usr/src/app/plugins

RUN webpack --config webpack.prod.config.js

WORKDIR /usr/src/app/bin

CMD ["./start.sh"]

