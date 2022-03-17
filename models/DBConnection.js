const mongoose = require("mongoose");
require("dotenv").config();

const DBConnection = async () => {
  // db connection
  mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.sp6mo.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  mongoose.connection.on("open", () => {
    console.log("connected to ", process.env.DB_NAME);
  });
  mongoose.connection.on("error", (error) => console.error(error));
};
module.exports = DBConnection;
