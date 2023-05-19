const express = require("express");
const { isAdmin, requireSignIn } = require("../middleware/userMiddleware");
const {
  addPostControllers,
  getAllPostsControllers,
  updatePost,
  deletePost,
} = require("../controllers/postControllers");

const router = express.Router();

router.post("/new", requireSignIn, isAdmin, addPostControllers);
router.get("/", requireSignIn, isAdmin, getAllPostsControllers);
router.put("/update/:id", requireSignIn, isAdmin, updatePost);
router.delete("/delete/:id", requireSignIn, isAdmin, deletePost);

module.exports = router;
