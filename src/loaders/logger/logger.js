const winston = require("winston");
const config = require("../../config/config");

const transports = [];
transports.push(new winston.transports.Console());

const LoggerInstance = winston.createLogger({
  level: config.logLevel,
  format: winston.format.simple(),
  transports,
});

module.exports = LoggerInstance;
