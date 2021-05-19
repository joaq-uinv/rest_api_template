const Server = require("./server/Server");
const { connectToDB } = require("./mongoose/mongoose");
const config = require("../config/config");
const logger = require("./logger/logger");

const initExpressServer = async () => {
  //init db connection
  await connectToDB();
  logger.info("Connection to database established");

  //init express server
  const server = new Server();
  logger.info("Server loaded successfully");

  //init server
  server.start();
  logger.info(`Server running on port ${config.port}`);
};

module.exports = { initExpressServer };
