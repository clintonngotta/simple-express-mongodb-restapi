const mongoose = require("mongoose");
// const Joi = require("joi");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    followers: Array,
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

// function validateUser(user) {
//   const schema = {
//     username: Joi.string().required(),
//     password: Joi.string().required(),
//   };
//   return Joi.validate(user, schema);
// }

// exports.validate = validateUser;
module.exports = mongoose.model("users", UserSchema);
