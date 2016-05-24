FROM hub.c.163.com/hujb2000/easynode:7.0.1

MAINTAINER hujb

RUN rm /bin/sh && \
    ln -s /bin/bash /bin/sh

RUN npm install -g cnpm --registry=https://r.cnpmjs.org

RUN npm install -g easynode-watch

RUN npm install -g node-gyp

RUN npm install -g babel-cli

RUN npm install apidoc -g

RUN npm install -g webpack

RUN npm install -g eslint

RUN npm install -g eslint-plugin-react


RUN mkdir -p /usr/src/app

COPY package.json /usr/src/app

WORKDIR /usr/src/app

RUN npm install

COPY . /usr/src/app

RUN eslint src --ext .js --fix

WORKDIR /usr/src/app/plugins

RUN eslint js --ext .js,.jsx --fix

RUN webpack --config webpack.prod.config.js

WORKDIR /usr/src/app/plugins/apidoc

RUN sh apidoc.sh

WORKDIR /usr/src/app

RUN babel src -d lib

RUN rm -rf src plugins/webpack.prod.config.js  plugins/apidoc plugins/css plugins/js

COPY plugins/js/index.js plugins/js/.

WORKDIR /usr/src/app/bin

CMD ["./start.sh"]

