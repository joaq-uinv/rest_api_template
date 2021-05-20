const express = require("express");
const AuthServices = require("../services/authServices");
const authServices = new AuthServices();
const Sucess = require("../handlers/SucessHandler");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.next} next
 * @description post request to login with an existing user
 * @route /login
 */

const login = async (req, res, next) => {
  //email and pass coming from the client
  const { email, password } = req.body;
  try {
    //parse data coming from body
    res.json(new Sucess(await authServices.login(email, password)));
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
