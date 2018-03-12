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


module.exports.task = function messagesRequested (job) {
  console.log(job);
  return socketServer.sendMessagesToId(job.socketId, job.messages);
};