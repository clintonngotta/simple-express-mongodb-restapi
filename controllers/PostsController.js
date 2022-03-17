const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// import models
const postsModel = require("../models/Posts");

const getAllPosts = (req, res) => {
  postsModel
    .find()
    .then(function (posts) {
      if (posts) {
        res.status(200).json(posts);
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

const getSinglePost = async (req, res) => {
  const verify = verifyToken(req);
  if (verify !== "Invalid Or No Access Token") {
    postsModel
      .findById(req.params.id)
      .then(function (post) {
        if (post) {
          res.status(200).json(post);
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

const createNewPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const Post = new postsModel({
    title: req.body.title,
    description: req.body.description,
    comments: req.body.comments,
    likes: req.body.likes,
    status: req.body.status,
    author: req.body.author,
  });
  try {
    const newPost = await Post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updatePost = async (req, res) => {
  postsModel
    .findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(function () {
      postsModel.findOne({ _id: req.params.id }).then(function (post) {
        res.send(post);
      });
    })
    .catch((error) => {
      if (error) {
        throw error;
      }
    });
};

const deletePost = (req, res) => {
  postsModel
    .findByIdAndRemove({ _id: req.params.id })
    .then(function (err, post) {
      if (post) {
        res.status(200).send({
          message: "post deleted",
          post: post,
        });
      } else {
        res.status(404).send("post of id " + req.params.id + " not found");
      }
    })
    .catch((error) => {
      if (error) {
        throw error;
      }
    });
};

const likePost = async (req, res) => {
  if (req.body.user) {
    postsModel
      .findById(req.params.id)
      .then(function (post) {
        if (post) {
          let newPost = post;
          if (newPost.likedBy.length > 0) {
            if (newPost.likedBy.includes(req.body.user)) {
              res.status(500).json({ message: "You already liked this post" });
            } else {
              newPost.likedBy.push(req.body.user);
            }
          } else {
            newPost["likedBy"] = [req.body.user];
          }
          postsModel.updateOne(
            { _id: req.params.id },
            newPost,
            function (err, update) {
              err === null
                ? res.status(200).json(newPost)
                : res.status(500).json({
                    message: "error occured, could not post comment",
                  });
            }
          );
        } else {
          res.status(404).json({ message: "post not found" });
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

const unLikePost = async (req, res) => {
  if (req.body.user) {
    postsModel
      .findById(req.params.id)
      .then(function (post) {
        if (post) {
          let newPost = post;
          if (newPost.likedBy.includes(req.body.user)) {
            newPost.likedBy = newPost.likedBy.filter(
              (likes) => likes !== req.body.user
            );
            postsModel.updateOne(
              { _id: req.params.id },
              newPost,
              function (err, update) {
                err === null
                  ? res.status(200).json(newPost)
                  : res.status(500).json({
                      message: "error occured, could not post comment",
                    });
              }
            );
          } else {
            res.status(500).json({ message: "You have not liked this post" });
          }
        } else {
          res.status(404).json({ message: "post not found" });
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

const commentOnPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let val = {
    commentBy: "clintonngotta",
    comment: "Awesome New post",
    commentedOn: "2022-03-17T09:52:28.790Z",
  };

  postsModel
    .findById(req.params.id)
    .then(function (post) {
      let newPost = post;
      let newComment = {
        commentBy: req.body.commentBy,
        comment: req.body.comment,
        commentedOn: new Date(Date.now()),
      };

      if (newPost) {
        if (Object.keys(newPost.comments).length > 0) {
          let addToNewComment = [newPost["comments"], newComment];
          newPost["comments"] = addToNewComment;
        } else {
          newPost["comments"] = newComment;
        }
        postsModel.updateOne(
          { _id: req.params.id },
          newPost,
          function (err, update) {
            err === null
              ? res.status(200).json(newPost)
              : res.status(500).json({
                  message: "error occured, could not post comment",
                });
          }
        );
      } else {
        res.status(404).json({ message: "post not found" });
      }
    })
    .catch((error) => {
      if (error) {
        throw error;
      }
    });
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
  getAllPosts,
  getSinglePost,
  createNewPost,
  updatePost,
  deletePost,
  likePost,
  unLikePost,
  commentOnPost,
};
