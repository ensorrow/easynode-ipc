FROM hujb2000/easynode:6.2.0

MAINTAINER hujb

RUN source $HOME/.bashrc && \
    npm install -g cnpm --registry=https://r.cnpmjs.org && \
    npm install -g easynode-watch && \
    npm install -g node-gyp && \
    npm install -g babel-cli && \
    npm install apidoc -g && \
    npm install -g webpack &&\
    npm install -g eslint && \
    npm install -g eslint-plugin-react


RUN mkdir -p /usr/src/app

COPY package.json /usr/src/app

WORKDIR /usr/src/app

RUN source $HOME/.bashrc && \ 
          npm install

COPY . /usr/src/app

RUN source $HOME/.bashrc && \
    eslint src --ext .js --fix

WORKDIR /usr/src/app/plugins

RUN source $HOME/.bashrc && \
    eslint js --ext .js,.jsx --fix

RUN source $HOME/.bashrc && \
    webpack --config webpack.prod.config.js

WORKDIR /usr/src/app/plugins/apidoc

RUN source $HOME/.bashrc && \
    sh apidoc.sh

WORKDIR /usr/src/app

RUN source $HOME/.bashrc && \
	babel src -d lib

RUN rm -rf src plugins/webpack.prod.config.js  plugins/apidoc plugins/css plugins/js

COPY plugins/js/index.js plugins/js/.

WORKDIR /usr/src/app/bin

CMD ["./start.sh"]

