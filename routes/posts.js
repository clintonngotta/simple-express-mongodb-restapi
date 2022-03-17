const express = require("express");
const router = express.Router();

// import controllers
const PostsController = require("../controllers/PostsController");

// posts routes
router.get("/", PostsController.getAllPosts);
router.get("/:id", PostsController.getSinglePost);
router.post("/create", PostsController.createNewPost);
router.patch("/update/:id", PostsController.updatePost);
router.delete("/delete/:id", PostsController.deletePost);

module.exports = router;
