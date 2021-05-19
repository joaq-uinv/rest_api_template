const express = require("express");
const UserServices = require("../services/UserServices");
const userServices = new UserServices();
const Success = require("../handlers/SucessHandler");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @description get all users with pagination
 * @route GET /api/v1/users //!add queries to url
 */

const getAllUsers = async (req, res, next) => {
  try {
    //send request to the db with desired pagination queries
    const users = await userServices.getAll(
      req.query.filter,
      req.query.options
    );
    //parse response
    res.json(new Success(users));
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @description get user by ID
 * @route GET /api/v1/users/:id
 */

const getUserByID = async (req, res, next) => {
  try {
    //id entered in the url as a param
    const id = req.params.id;
    //Send req to the db with the user id
    const user = await userServices.getByID(id);
    //parse res
    res.json(new Success(user));
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @description post users
 * @route POST /api/v1/users
 */

const createUser = async (req, res, next) => {
  try {
    //e.g data posted in the client
    let user = req.body;
    //fetch previoulsy posted data from the db
    user = await userServices.create(user);
    res.status(201).json(new Success(user)); //the 201 code indicates that the request has succeeded and has led to the creation of a resource
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @description edit user by ID
 * @route PUT /api/v1/users/:id
 */

const updateUser = async (req, res, next) => {
  try {
    //params sent in the request i.e the user's id inthe route /:id
    const { id } = req.params;
    //data coming from the client
    let user = req.body;
    //edit transaction and persist it to the db
    const updatedUser = await userServices.edit(id, user);
    //parse response
    res.json(new Success(updatedUser));
  } catch (error) {
    next(error);
  }
};

/**(
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @description delete user by id
 * @route DELETE /api/v1/users/:id
 */

const deleteUser = async (req, res, next) => {
  try {
    //params sent in the request i.e the route /:id
    const { id } = req.params;
    //delete document with the corresponding id sent in the request from the db
    const user = await userServices.delete(id);
    //parse response
    res.json(new Success(user));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserByID,
  createUser,
  updateUser,
  deleteUser,
};
