const { Router } = require("express");
const {
  getAllUsers,
  getUserByID,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");
const {
  getAllRequestValidations,
  getByIdRequestValidations,
  postRequestValidations,
  putRequestValidations,
  deleteRequestValidations,
} = require("../middlewares/users/userMiddlewares");

const router = Router();

router.get("/", getAllRequestValidations, getAllUsers);
router.get("/:id", getByIdRequestValidations, getUserByID);
router.post("/", postRequestValidations, createUser);
router.put("/:id", putRequestValidations, updateUser);
router.delete("/:id", deleteRequestValidations, deleteUser);

module.exports = router;
