const express = require("express");
const router = express.Router();

// import controllers
const AuthController = require("../controllers/AuthController");

// auth routes
router.post("/login", AuthController.loginUser);
router.post("/register", AuthController.registerUser);

module.exports = router;
