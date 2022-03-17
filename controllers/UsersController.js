// import models
const usersModel = require("../models/Users");
const jwt = require("jsonwebtoken");

const getAllUsers = (req, res) => {
  usersModel
    .find()
    .then(function (users) {
      console.log(users);
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
  const verify = verifyToken(req);
  if (verify !== "Invalid Or No Access Token") {
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
  } else {
    res.json({
      message: "FORBIDDEN",
      code: 403,
      errors: verify,
    });
  }
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

function verifyToken(req) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  let verify = "";
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    // return req.token = bearerToken;

    if (bearerToken) {
      jwt.verify(bearerToken, process.env.APP_SCRET_KEY, (err, authData) => {
        if (err) {
          verify = "Invalid Or No Access Token";
        } else {
          verify = bearerToken;
        }
      });
    }
  } else {
    verify = "Invalid Or No Access Token";
  }
  return verify;
}

module.exports = {
  getAllUsers,
  getSingleUser,
  followOtherUsers,
  unFollowOtherUsers,
};
