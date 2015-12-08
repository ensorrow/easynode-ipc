FROM easynode:0.0.2

MAINTAINER hujb

RUN mkdir -p /usr/src/app

COPY . /usr/src/app

WORKDIR /usr/src/app
RUN cnpm install

CMD ["./start_servers.sh"]

