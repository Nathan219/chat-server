'use strict';

const Joi = require('joi');
const Promise = require('bluebird');
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
  return Promise.map(job.messages, message => socketServer.sendMessageToId(job.socketId, message));
};