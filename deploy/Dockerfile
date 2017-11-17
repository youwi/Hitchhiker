#
#  this file create a release docker IMAGE
#  this docker file is not for CI
#

FROM node:7.10
MAINTAINER youwi-Hitchhiker youta@live.cn

RUN apt-get update

# code folder
RUN mkdir -p /usr/src
WORKDIR /usr/src
RUN git clone   https://github.com/youwi/Hitchhiker.git

WORKDIR /usr/src/Hitchhiker/server
RUN  npm install
RUN  npm build

WORKDIR /usr/src/Hitchhiker/client
RUN  npm install
RUN  npm build

# start mail
EXPOSE 8080
CMD ["pm2-docker", "index.js"]
