const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    featureImage: String,
    comments: {
      commentBy: { type: mongoose.Schema.Types.ObjectId },
      comment: String,
      commentedOn: { type: Date },
    },
    likes: {
      likedBy: { type: mongoose.Schema.Types.ObjectId },
    },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("posts", PostSchema);
