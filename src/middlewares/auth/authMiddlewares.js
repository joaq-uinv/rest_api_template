const express = require("express");
const { check } = require("express-validator");
const { commonValidationResult } = require("../commonMiddlewares");
const AuthServices = require("../../services/authServices");
const authServices = new AuthServices();

//check if the email and the password were pass through the body
const _emailRequired = check("email", "Email is required").not().isEmpty();
const _passRequired = check("password", "Password is required").not().isEmpty();

//check if the email and the token have the correct format e.g user@mail.com for the mail
const _isEmailValid = check("email", "Email is invalid").isEmail();

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const validJWT = async (req, res, next) => {
  try {
    //check if the token is passed throught the request header
    const token = req.header("Authorization");
    //fetch user from the db with the corresponding token
    const user = await authServices.isTokenValid(token);
    //set the value of the user key of the request to the user fetched from the db, so that it can be used in the next data flow within the life cycle of express
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

//check the user's role
const hasRole = (...roles) => {
  return (req, res, next) => {
    try {
      authServices.isRoleValid(req.user, ...roles);
      next();
    } catch (error) {
      next(error);
    }
  };
};

//validations for the /login POST endpoint
const postLoginRequestValidations = [
  commonValidationResult,
  _emailRequired,
  _isEmailValid,
  _passRequired,
];

module.exports = { postLoginRequestValidations, validJWT, hasRole };
