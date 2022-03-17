const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

// import models
const postsModel = require("../models/Posts");

const getAllPosts = (req, res) => {
  res.send({ posts: [] });
};

const getSinglePost = (req, res) => {
  res.send({ posts: [] });
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

const updatePost = (req, res) => {
  res.send("updatePost");
};

const deletePost = (req, res) => {
  res.send("deletePost");
};

module.exports = {
  getAllPosts,
  getSinglePost,
  createNewPost,
  updatePost,
  deletePost,
};
