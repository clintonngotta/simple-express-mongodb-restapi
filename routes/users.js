const express = require("express");
const router = express.Router();

// import controllers
const UsersController = require("../controllers/UsersController");

// posts routes
router.get("/", UsersController.getAllUsers);
router.get("/:id", UsersController.getSingleUser);

module.exports = router;
