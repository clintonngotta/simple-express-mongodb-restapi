const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

// import models
const usersModel = require("../models/Users");

const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let user = await usersModel.findOne({ username: req.body.username });
  if (!user) {
    return res.status(400).send("Incorrect username or password.");
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send("Incorrect email or password.");
  }
  res.send("loggedIn Successfully");
};

const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const User = new usersModel({
    username: req.body.username,
    password: req.body.password,
    followers: req.body.followers,
  });
  try {
    const salt = await bcrypt.genSalt(10);
    User.password = await bcrypt.hash(User.password, salt);
    const newuser = await User.save();
    res.status(201).json(newuser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  loginUser,
  registerUser,
};
