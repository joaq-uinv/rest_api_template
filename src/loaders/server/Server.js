const express = require("express");
const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");
const config = require("../../config/config");
const userRoutes = require("../../routes/userRoutes");
const authRoute = require("../../routes/authRoutes");
const swaggerJSON = require("../swagger/swagger.json");
const logger = require("../logger/logger");

class Server {
  constructor() {
    this.app = express();
    this.port = config.port;
    this.prefix = config.api.prefix;
    this._middlewares();
    this._routes();
    this._swaggerConfig();
  }

  _middlewares() {
    this.app.use(express.json()); //body parser
    this.app.use(morgan("tiny")); //log endpoint and status of the response
  }

  _routes() {
    this.app.use(`${this.prefix}/users`, userRoutes); //use the routes created in the users' routes file in the /api/v1 route
    this.app.use("/", authRoute); //use the routes created in the auth route file in the /api/v1 route
  }

  _swaggerConfig() {
    this.app.use(
      config.swagger.path,
      swaggerUI.serve,
      swaggerUI.setup(swaggerJSON)
    );
  }

  //!ADD ERROR HANDLERS

  async start() {
    //app will listen on port set in config file
    this.app.listen(this.port, (error) => {
      //if there's an error, the app will shut down
      if (error) {
        logger.info(error);
        process.exit(1);
        return;
      }
    });
  }
}

module.exports = Server;
