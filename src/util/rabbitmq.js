'use strict';
const joi = require('joi');

const RabbitMQClient = require('ponos/lib/rabbitmq');

class RabbitMQ extends RabbitMQClient {
  constructor () {
    super({
      name: 'socket-server',
      hostname: process.env.RABBITMQ_HOST,
      port: process.env.RABBITMQ_PORT,
      username: 'guest',
      password: 'guest',
      events: [{
        name: 'message.received'
      }, {
        name: 'messages.requested'
      }, {
        name: 'message.sent'
      }, {
        name: 'user.connected'
      }]
    })
  }
}
module.exports = new RabbitMQ();