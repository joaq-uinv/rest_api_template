const express = require("express");
const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");
const config = require("../../config/config");
const logger = require("../logger/logger");
const userRoutes = require("../../routes/userRoutes");
const authRoute = require("../../routes/authRoutes");
const swaggerJSON = require("../swagger/swagger.json");

class Server {
  constructor() {
    this.app = express();
    this.port = config.port;
    this.prefix = config.api.prefix;
    this._middlewares();
    this._routes();
    this._swaggerConfig();
    this._notFound();
    this._errorHandler();
  }

  _middlewares() {
    this.app.use(express.json()); //body parser
    this.app.use(morgan("tiny")); //log endpoint and status of the response
  }

  _routes() {
    this.app.use(`${this.prefix}/users`, userRoutes); //use the routes created in the users' routes file in the /api/v1 route
    this.app.use("/", authRoute); //use the routes created in the auth route file in the /api/v1 route
  }

  //external error
  _notFound() {
    this.app.use((req, res, next) => {
      const err = new Error("Not Found");
      //create the attr code the the err variable
      err.code = 404;
      next(err);
    });
  }

  //internal server error
  _errorHandler() {
    /**
     * @param {express.ErrorRequestHandler} err
     */
    this.app.use((err, req, res, next) => {
      //define the code of the error
      const code = err.code || 500;

      logger.error(`${code} - ${err.message}`);
      logger.error(err.stack);

      //define the structure of the error
      const body = {
        error: {
          code,
          message: err.message,
          detail: err.data,
        },
      };
      //parse the error
      res.status(code).json(body);
    });
  }

  _swaggerConfig() {
    this.app.use(
      config.swagger.path,
      swaggerUI.serve,
      swaggerUI.setup(swaggerJSON)
    );
  }

  async start() {
    //app will listen on port set in config file
    this.app.listen(this.port, (error) => {
      //if there's an error, the app will shut down
      if (error) {
        logger.error(error);
        process.exit(1);
        return;
      }
    });
  }
}

module.exports = Server;
