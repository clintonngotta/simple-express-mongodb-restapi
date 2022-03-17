const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// import controllers
const AuthController = require("../controllers/AuthController");

// auth routes
router.post(
  "/login",
  body("username").exists().withMessage("Username is Requiered"),
  body("password").exists().withMessage("Password is Requiered"),
  AuthController.loginUser
);
router.post(
  "/register",
  body("username").exists().withMessage("Username is Requiered"),
  body("password").exists().withMessage("Password is Requiered"),
  AuthController.registerUser
);

module.exports = router;
