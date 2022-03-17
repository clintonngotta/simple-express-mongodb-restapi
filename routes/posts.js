const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

// import controllers
const PostsController = require("../controllers/PostsController");

// posts routes
router.get("/", PostsController.getAllPosts);
router.get("/:id", PostsController.getSinglePost);
router.post(
  "/create",
  body("description").exists().withMessage("description is Requiered"),
  body("title").exists().withMessage("title is Requiered"),
  body("author").exists().withMessage("author is Requiered"),
  PostsController.createNewPost
);
router.patch("/update/:id", PostsController.updatePost);
router.delete("/delete/:id", PostsController.deletePost);

module.exports = router;
