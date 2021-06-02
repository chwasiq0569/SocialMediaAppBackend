const router = require("express").Router();
const {
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPost,
  timeline,
} = require("../controller/post");

router.get("/:id", getPost);
router.post("/timeline", timeline);
router.post("/create", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.put("/:id/like", likePost);

module.exports = router;
