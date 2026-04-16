const express = require("express");
const router = express.Router();

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const {
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.get(
  "/",
  protect,
  authorizeRoles("Super Admin"),
  getAllUsers
);

router.put(
  "/:id",
  protect,
  authorizeRoles("Super Admin"),
  updateUser
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("Super Admin"),
  deleteUser
);

module.exports = router;