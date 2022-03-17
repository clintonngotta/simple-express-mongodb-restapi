const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    comments: {
      commentBy: String,
      comment: String,
      commentedOn: { type: Date, default: Date.now },
    },
    likedBy: Array,
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("posts", PostSchema);
