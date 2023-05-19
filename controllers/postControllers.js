const postModel = require("../model/postModel");

const addPostControllers = async (req, res) => {
  try {
    const { title, body, location, userId } = req.body;
    const posts = await new postModel({
      title,
      body,
      location,
      userId,
    }).save();
    res.status(201).send({
      status: "success",
      message: "Post Created...!",
      posts,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Server Error...!",
    });
  }
};

const getAllPostsControllers = async (req, res) => {
  try {
    const posts = await postModel.find();
    res.status(200).send({
      success: true,
      message: "All Post",
      iteam: posts.length,
      posts: posts,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Server Error...!",
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await postModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send({
      success: true,
      message: "Post Updated",
      posts,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Server Error...!",
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await postModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Post Deleted",
      posts,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Server Error...!",
    });
  }
};

module.exports = {
  addPostControllers,
  getAllPostsControllers,
  updatePost,
  deletePost,
};
