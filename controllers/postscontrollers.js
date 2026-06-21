import { StatusCodes } from "http-status-codes";
import Posts from "../models/post.js";
export const getAllPosts = async (req, res) => {
  const posts = await Posts.find({ postedBy: req.user.userId }).sort(
    "-createdAt",
  );
  res.status(200).json({ posts });
};

export const createPost = async (req, res) => {
  const { content, photo, video } = req.body;
  const post = await Posts.create({
    content,
    photo,
    video,
    postedBy: req.user.userId,
  });
  return res.status(StatusCodes.CREATED).json({ post });
};
