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

const followOtherUsers = async (req, res) => {
  if (req.body.username) {
    usersModel
      .findById(req.params.id)
      .then(function (user) {
        if (user) {
          let newUser = user;
          if (newUser.followers.length > 0) {
            if (newUser.followers.includes(req.body.username)) {
              res
                .status(500)
                .json({ message: "You already followed this post" });
            } else {
              newUser.followers.push(req.body.username);
            }
          } else {
            newUser["followers"] = [req.body.username];
          }
          usersModel.updateOne(
            { _id: req.params.id },
            newUser,
            function (err, update) {
              err === null
                ? res.status(200).json(newUser)
                : res.status(500).json({
                    message: "error occured, could not follow this user",
                  });
            }
          );
        } else {
          res.status(404).json({ message: "user not found" });
        }
      })
      .catch((error) => {
        if (error) {
          throw error;
        }
      });
  } else {
    res.status(500).json({ message: "specify user" });
  }
};

const unFollowOtherUsers = async (req, res) => {
  if (req.body.username) {
    usersModel
      .findById(req.params.id)
      .then(function (user) {
        if (user) {
          let newUser = user;
          console.log(newUser.followers);
          if (newUser.followers.includes(req.body.username)) {
            newUser.followers = newUser.followers.filter(
              (likes) => likes !== req.body.username
            );
            usersModel.updateOne(
              { _id: req.params.id },
              newUser,
              function (err, update) {
                err === null
                  ? res.status(200).json(newUser)
                  : res.status(500).json({
                      message: "error occured, could not unfollow this user",
                    });
              }
            );
          } else {
            res
              .status(500)
              .json({ message: "You have not yet followed this user" });
          }
        } else {
          res.status(404).json({ message: "user not found" });
        }
      })
      .catch((error) => {
        if (error) {
          throw error;
        }
      });
  } else {
    res.status(500).json({ message: "specify user" });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  followOtherUsers,
  unFollowOtherUsers,
};
