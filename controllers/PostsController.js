const getAllPosts = (req, res) => {
  res.send({ posts: [] });
};

const getSinglePost = (req, res) => {
  res.send({ posts: [] });
};

const createNewPost = (req, res) => {
  res.send("createNewPost");
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
