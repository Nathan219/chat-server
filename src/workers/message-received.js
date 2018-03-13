'use strict';

const Joi = require('joi');

const socketServer = require('../util/socket-server');

module.exports.jobSchema = Joi.object({
  tid: Joi.string(),
  author: Joi.string().required(),
  message: Joi.string(),
  created: Joi.date()
}).required();

/**
 * When a new message was saved to the Db, the message.received event fires.  This worker sends that new message
 * to all connected clients
 */
module.exports.task = function MessageReceived (job) {
  return socketServer.sendMessage(job);
};