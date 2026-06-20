import Posts from "../models/post.js";
const getAllPosts = async (req, res) => {
  const posts = Posts.find({ createdBy: req.user.userId }).sort("-createdAt");
  res.status(200).json({ posts });
};
