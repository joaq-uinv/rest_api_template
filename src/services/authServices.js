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
      logger.error(error);
    }
  }

  async isTokenValid(token) {
    try {
      //check token is passed as a param
      !token && new AppError("Authentication failed. Token required", 401);

      //check the token is the one generated automatically
      let id;
      try {
        const obj = jwt.verify(token, config.authentication.secret);
        id = obj.id;
      } catch (error) {
        throw new AppError("Authentication failed. Invalid token", 401);
      }

      //check if a user with the previously generated token exists in the db
      const user = await this.userServices.getByID(id);
      !user && new AppError("Authentication failed. Invalid token", 401);
      //check if the user with the token is enabled
      !user.enable && new AppError("Authentication failed. User disabled", 401);
      return user;
    } catch (error) {
      logger.info(error);
    }
  }

  //check the user's permissions according to its role. only admins will be able to post, update and delete users
  isRoleValid(user, ...roles) {
    if (!roles.includes(user.role)) {
      throw new AppError(
        "Authorization failed. User without the necessary permissions",
        403
      );
    }
    return true;
  }
}

module.exports = AuthServices;
