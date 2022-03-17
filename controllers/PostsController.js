const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

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

const getSinglePost = async (req, res, next) => {
  let post = await getPost(req, res, next);
  res.send(post);
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
        res.json(err);
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

async function getPost(req, res, next) {
  let post;
  try {
    post = await postsModel.findById(req.params.id);
    console.log(post);
    if (post == null) {
      return res.status(404).json({ message: "Cannot find post" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.post = post;
  next();
}
module.exports = {
  getAllPosts,
  getSinglePost,
  createNewPost,
  updatePost,
  deletePost,
};
