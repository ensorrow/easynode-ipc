FROM hub.c.163.com/hujb2000/node:6.2.0-jessie

MAINTAINER hujb

RUN npm install -g cnpm --registry=https://r.cnpmjs.org

RUN npm install -g easynode-watch

RUN npm install -g node-gyp

RUN npm install -g babel-cli

RUN npm install apidoc -g

RUN npm install -g webpack

RUN mkdir -p /usr/src/app

COPY package.json /usr/src/app

WORKDIR /usr/src/app

RUN npm install

COPY . /usr/src/app

WORKDIR /usr/src/app/plugins

RUN webpack --config webpack.prod.config.js

WORKDIR /usr/src/app/plugins/apidoc

RUN sh apidoc.sh

WORKDIR /usr/src/app

WORKDIR /usr/src/app/bin

CMD ["./start.sh"]

