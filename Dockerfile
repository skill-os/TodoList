FROM node:7

MAINTAINER O.Saber <werhanisaber@gmail.com>

#ENV http_proxy "http://172.17.0.1:3128"
#ENV https_proxy "http://172.17.0.1:3128"
#ENV no_proxy "172.17.0.1"
#RUN echo "proxy_url: http://172.17.0.1:3128"

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

CMD node app.js

EXPOSE 8081