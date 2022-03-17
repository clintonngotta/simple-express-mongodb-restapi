// import models
const usersModel = require("../models/Users");

const getAllUsers = (req, res) => {
  usersModel
    .find()
    .then(function (users) {
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(404).json({ message: "error occured" });
      }
    })
    .catch((error) => {
      if (error) {
        throw error;
      }
    });

  res.send({ users: [] });
};

const getSingleUser = (req, res) => {
  usersModel
    .findById(req.params.id)
    .then(function (user) {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "error occured" });
      }
    })
    .catch((error) => {
      if (error) {
        throw error;
      }
    });
};

module.exports = {
  getAllUsers,
  getSingleUser,
};
