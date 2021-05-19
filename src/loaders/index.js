const Server = require("./server/Server");
const { connectToDB } = require("./mongoose/mongoose");
const config = require("../config/config");

const initExpressServer = async () => {
  //init db connection
  await connectToDB();
  console.log("Connection to database established");

  //init express server
  const server = new Server();
  console.log("Server loaded successfully");

  //init server
  server.start();
  console.log(`Server running on port ${config.port}`);
};

module.exports = { initExpressServer };
