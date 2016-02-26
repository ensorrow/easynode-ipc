FROM hujb2000/easynode@5.5.0

MAINTAINER hujb

RUN mkdir -p /usr/src/app

COPY package.json /usr/src/app

WORKDIR /usr/src/app

RUN cnpm install

COPY . /usr/src/app

WORKDIR /usr/src/app/plugins
RUN webpack


WORKDIR /usr/src/app/bin

CMD ["./start_prod_servers.sh"]

