const router = require("express").Router();
const { createPost, updatePost, deletePost } = require("../controller/post");

router.post("/create", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;
