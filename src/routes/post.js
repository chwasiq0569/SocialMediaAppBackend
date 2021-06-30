const router = require("express").Router();
const {
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPost,
  timeline,
} = require("../controller/post");
const { requireSignIn } = require("../middlewares/common-middleware");
const upload = require("../middlewares/FileUpload");

router.get("/:id", getPost);
router.get("/timeline/:userId", timeline);
router.post(
  "/create",
  upload.fields([{ name: "postImage", maxCount: 1 }]),
  createPost
);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.put("/:id/like", likePost);

module.exports = router;
