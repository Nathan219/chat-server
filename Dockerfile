FROM node:6.13.1

ADD . /chat-server
WORKDIR /chat-server

RUN npm install
ARG PORT
EXPOSE $PORT

CMD sleep 10; npm start