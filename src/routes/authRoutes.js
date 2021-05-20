const { Router } = require("express");
const { login } = require("../controllers/authControllers");

const router = Router();

router.post("/login", login);

module.exports = router;
