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
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  !errors.isEmpty() && new AppError("Validation error", 400, errors.errors); //!SEE BELOW TO SEE THE .ERRORS MODEL

  next();
};

module.exports = { commonValidationResult };

//!ERRORS MODEL
// {
//   "errors": [
//     {
//       "location": "body",
//       "msg": "Invalid value",
//       "param": "username"
//     }
//   ]
// }
