'use strict';

const Joi = require('joi');

const socketServer = require('../util/socket-server');

module.exports.jobSchema = Joi.object({
  tid: Joi.string(),
  author: Joi.string().required(),
  message: Joi.string(),
  created: Joi.date()
}).required();


module.exports.task = function MessageReceived (job) {
  console.log(job);
  return socketServer.sendMessage(job);
};