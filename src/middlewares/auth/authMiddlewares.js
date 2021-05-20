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
    //fetch token from the db and compare it the the one passed through the req header
    const user = await authServices.isTokenValid(token);
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
  _passRequired,
];

module.exports = { postLoginRequestValidations, validJWT, hasRole };
