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

module.exports.updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    if (req.body.userId === post.userId) {
      try {
        console.log(post, req.body);
        await post.updateOne({ $set: req.body });
        res.status(200).json(post);
      } catch (err) {
        res.status(403).json({ message: "Post not Updated" });
      }
    } else {
      res.status(502).json({ message: "You can only update your Post" });
    }
  } else {
    res.status(500).json({ message: "Post not found" });
  }
};
