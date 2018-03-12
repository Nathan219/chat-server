'use strict';

const Promise = require('bluebird');
const express = require('express');
const socket = require('socket.io');
const rabbitmq = require('./rabbitmq');

const app = express();

class SocketServer {
  constructor () {
    this.connectionMap = {};
  }

  connect () {
    return Promise
      .fromCallback(cb => {
        const server = app.listen(process.env.PORT, () => cb(null, server))
      })
      .then(server => {
        console.log(`server is running on port ${process.env.PORT}`);
        this.io = socket(server);
        this.io.on('connection', socket => this.addClient(socket));
        this.io.on('disconnect', data => this.removeClient(data));
      });
  }

  addClient (socket) {
    if (this.connectionMap[socket.id]) {
      return console.error('Client is being added twice!', socket.id);
    }
    this.connectionMap[socket.id] = socket;
    rabbitmq.publishEvent('user.connected', {
      socketId: socket.id
    });
    socket.on('SEND_MESSAGE', data => {
      return rabbitmq.publishEvent('message.sent', data)
    });
  }

  removeClient (socketId) {
    return delete this.connectionMap[socketId];
  }

  sendMessage (data) {
    return this.io.emit('RECEIVE_MESSAGE', data);
  }

  sendMessageToId(id, data) {
    return this.io.to(id).emit('RECEIVE_MESSAGE', data);
  }
}

module.exports = new SocketServer();

