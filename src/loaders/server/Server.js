const express = require("express");
const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");
const config = require("../../config/config");

class Server {
  constructor() {
    this.app = express();
    this.port = config.port;
    this.prefix = config.prefix;
    this._middlewares();
    // this._swaggerConfig();
  }

  _middlewares() {
    this.app.use(express.json()); //body parser
    this.app.use(morgan("tiny")); //log endpoint and status of the response
  }

  //   _swaggerConfig() {
  //     this.app.use(config.swagger.path, swaggerUI.serve, swaggerUI.setup()); //!require swagger.json file

  async start() {
    //app will listen on port set in config file
    this.app.listen(this.port, (error) => {
      //if there's an error, the app will shut down
      if (error) {
        console.error(error);
        process.exit(1);
        return;
      }
    });
  }
}

module.exports = Server;
