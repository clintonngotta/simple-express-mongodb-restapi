require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const compression = require("compression");

const DBConnection = require("./models/DBConnection");
const app = express();
app.use(helmet());
app.use(express.json());
app.use(compression());

// db connnection
DBConnection();

// import routes
const authRoutes = require("./routes/auth");
const postsRoutes = require("./routes/posts");
const usersRoutes = require("./routes/users");

// initialize routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/posts", postsRoutes);
app.use("/api/v1/users", usersRoutes);

// start server
app.listen(process.env.PORT || 3000, () => {
  console.log("Server Running on Port: ", process.env.PORT || 3000);
});
