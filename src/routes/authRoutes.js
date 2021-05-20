const { Router } = require("express");
const { login } = require("../controllers/authControllers");
const {
  postLoginRequestValidations,
} = require("../middlewares/auth/authMiddlewares");

const router = Router();

router.post("/login", postLoginRequestValidations, login);

module.exports = router;
