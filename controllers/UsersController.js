const getAllUsers = (req, res) => {
  res.send({ users: [] });
};

const getSingleUser = (req, res) => {
  res.send({ user: [] });
};

module.exports = {
  getAllUsers,
  getSingleUser,
};
