const Post = require("../model/post");

module.exports.createPost = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savePost = await newPost.save();
    if (savePost) {
      res.status(200).json(savePost);
    } else {
      res.status(502).json({ message: "Post is not Saved" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
