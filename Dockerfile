FROM node

LABEL maintainer 'Francis Klay Rocha - klayrocha@gmail.com'

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json /usr/src/app/package.json

RUN npm install

RUN npm install -g @angular/cli

COPY . /usr/src/app

CMD ng serve --host 0.0.0.0