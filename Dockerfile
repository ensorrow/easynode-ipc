FROM easynode:0.0.3

MAINTAINER hujb

RUN mkdir -p /usr/src/app

COPY . /usr/src/app

WORKDIR /usr/src/app
RUN cnpm install

WORKDIR /usr/src/app/bin

CMD ["./start.sh"]

