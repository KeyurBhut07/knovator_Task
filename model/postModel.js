const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    default: "Keyur Bhut",
  },
  alive: {
    type: Boolean,
    default: true,
  },
  location: {
    type: String,
    required: true,
  },
  userId: String,
});

const PostModel = new mongoose.model("posts", PostSchema);

module.exports = PostModel;
