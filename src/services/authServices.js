const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const logger = require("../loaders/logger/logger");
const UserServices = require("./userServices");
const AppError = require("../handlers/AppError");

class AuthServices {
  constructor() {
    this.userServices = new UserServices();
    this._encrypt();
  }

  //generate json web token
  _encrypt = (id) =>
    jwt.sign({ id }, config.authentication.secret, {
      expiresIn: config.authentication.ttl,
    });

  async login(email, pass) {
    try {
      //validate if the email exists in the db
      const user = await this.userServices.getByEmail(email);
      !user &&
        new AppError(
          "Authentication failed. The email or password does not exist in the DB.",
          400
        );

      //check if the user trying to login is enabled in the db
      !user.enable &&
        new AppError("Authentication failed. The user is disabled", 400);

      //check if the password entered matches the encrypted one in the db
      const isPassValid = await bcrypt.compare(pass, user.password);
      !isPassValid &&
        new AppError(
          "Authentication failed. The email or password does not exist in the DB.",
          400
        );

      //generate jwt with the user's id
      const token = this._encrypt(user._id); //_id is the key mongo uses to assing and id automatically to every doc persisted

      return { token, user: user.name, role: user.role };
    } catch (error) {
      logger.info(error);
    }
  }
}

module.exports = AuthServices;
