'use strict';

const Joi = require('joi');
const socketServer = require('../util/socket-server');

module.exports.jobSchema = Joi.object({
  tid: Joi.string(),
  socketId: Joi.string().required(),
  messages: Joi.array().items({
    author: Joi.string().required(),
    message: Joi.string(),
    created: Joi.date()
  }).required()
}).required();

/**
 * When a new user connects, we send them a bunch of messages from before they joined.
 * This worker listens to the messages.requested event, and the messages to the socketId
 * provided
 */
module.exports.task = function messagesRequested (job) {
  return socketServer.sendMessagesToId(job.socketId, job.messages);
};