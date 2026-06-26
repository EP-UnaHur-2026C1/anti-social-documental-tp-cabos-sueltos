const mongoose = require("mongoose");

const postImageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const postSchema = new mongoose.Schema(
  {
    texto: {
      type: String,
      required: true,
    },
    imagenes: [postImageSchema],
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
