FROM easynode:0.0.3

MAINTAINER hujb

RUN mkdir -p /usr/src/app

COPY . /usr/src/app

WORKDIR /usr/src/app
RUN npm install

WORKDIR /usr/src/app/bin

ENTRYPOINT ["./start_servers.sh"]

