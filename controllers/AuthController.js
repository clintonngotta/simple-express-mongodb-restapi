const loginUser = (req, res) => {
  res.send("logged in");
};

const registerUser = (req, res) => {
  res.send("registerUser");
};

module.exports = {
  loginUser,
  registerUser,
};
