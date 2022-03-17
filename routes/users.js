const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

// import controllers
const UsersController = require("../controllers/UsersController");

// posts routes
router.get("/", UsersController.getAllUsers);
router.get("/:id", UsersController.getSingleUser);
router.post(
  "/follow/:id",
  body("username").exists().withMessage("username is Requiered"),
  UsersController.followOtherUsers
);
router.post(
  "/unfollow/:id",
  body("username").exists().withMessage("username is Requiered"),
  UsersController.unFollowOtherUsers
);
module.exports = router;
