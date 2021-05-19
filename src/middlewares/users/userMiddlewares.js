//File to validate the users' data i.e the attrs set in the user model, in every endpoint
const { check } = require("express-validator");
const AppError = require("../../handlers/AppError");
const { USER_ROLE, ADMIN_ROLE } = require("../../constants/constants");
const { commonValidationResult } = require("../commonMiddlewares");
const UserServices = require("../../services/userServices");
const userServices = new UserServices();

//check if the user's id was entered as a param in the endpoint
const _idRequired = check("id", "ID is required").not().isEmpty();

//check if the entered id is a mongo id
const _isMongoID = check("id").isMongoId();

//check if the id entered exists in the db
const _idExists = check("id").custom(async (id = "") => {
  //look for the entered id in the db
  const foundUser = await userServices.getByID(id);
  !foundUser && new AppError(`User with ID ${id} does not exist`, 400);
});

//validations for the /users GET endpoint
const getAllRequestValidations = [commonValidationResult];

//validations for the /users/:id GET endpoint
const getRequestValidations = [
  commonValidationResult,
  _idRequired,
  _isMongoID,
  _idExists,
];
