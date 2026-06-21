import Posts from "../models/post.js";
const getAllPosts = async (req, res) => {
  const posts = Posts.find({ createdBy: req.user.userId }).sort("-createdAt");
  res.status(200).json({ posts });
};

const createPost = async (req, res) => {
  const { content, photo, video } = req.body;
  const post = await Posts.create({content, photo,video, postedBy: req.user.userId});
  return res.status(201).json({post})
}

