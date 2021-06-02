const router = require("express").Router();
const { createPost, updatePost } = require("../controller/post");

router.post("/create", createPost);
router.put("/:id", updatePost);

module.exports = router;
