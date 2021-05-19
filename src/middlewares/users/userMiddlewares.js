//File to validate the users' data i.e the attrs set in the user model
const { check } = require("express-validator");
const AppError = require("../../handlers/AppError");
const { USER_ROLE, ADMIN_ROLE } = require("../../constants/constants");
