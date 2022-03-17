require("dotenv").config();
const express = require("express");
const DBConnection = require("./models/DBConnection");
const app = express();
app.use(express.json());
DBConnection();
// start server
app.listen(process.env.PORT || 3000, () => {
  console.log("Server Running on Port: ", process.env.PORT || 3000);
});
