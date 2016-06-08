FROM hujb2000/easynode:6.2.0

MAINTAINER hujb

WORKDIR /usr/src/app

RUN mv /usr/src/easynode/node_modules /usr/src/app

#RUN source $HOME/.bashrc && \
#     npm install easynode

COPY . /usr/src/app

RUN source $HOME/.bashrc && \
   eslint src --ext .js --fix

WORKDIR /usr/src/app/plugins

RUN source $HOME/.bashrc && \
    eslint js --ext .js,.jsx --fix

RUN source $HOME/.bashrc && \
    mcss mcss/index.mcss -o css/

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

