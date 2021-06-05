const Post = require("../model/post");
const User = require("../model/user");

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

module.exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    if (req.body.userId === post.userId) {
      try {
        console.log(post, req.body);
        await post.deleteOne({ $set: req.body });
        res.status(200).json({ message: "your Post is deleted Successfully!" });
      } catch (err) {
        res.status(403).json({ message: "Post not Deleted" });
      }
    } else {
      res.status(502).json({ message: "You can only delete your Post" });
    }
  } else {
    res.status(500).json({ message: "Post not found" });
  }
};

module.exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      if (!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push: { likes: req.body.userId } });
        res.status(200).json({ message: "Post Liked" });
      } else {
        await post.updateOne({ $pull: { likes: req.body.userId } });
        res.status(200).json({ message: "Post Disliked" });
      }
    } else {
      res.status(200).json({ message: "Post not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.timeline = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => Post.find({ userId: friendId }))
    );
    const allPosts = userPosts.concat(...friendPosts);
    res.status(200).json(allPosts);
  } catch (err) {
    res.status(500).json(err);
  }
};
