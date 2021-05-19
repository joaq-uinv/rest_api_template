//validation middleware for both the users and the authentication
const { validationResult } = require("express-validator");
const express = require("express");
const AppError = require("../handlers/AppError");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const commonValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError("Validation error", 400, errors.errors);
  }
  next();
};

module.exports = { commonValidationResult };
