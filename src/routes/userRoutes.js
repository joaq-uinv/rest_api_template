const { Router } = require("express");
const {
  getAllUsers,
  getUserByID,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUserByID);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("./id", deleteUser);

module.exports = router;
