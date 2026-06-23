import { StatusCodes } from "http-status-codes";
import Posts from "../models/post.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
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
export const updatePost = async (req, res) => {
  const { id: postId } = req.params;
  if (!Object.keys(req.body).length) {
    throw new BadRequestError("Please provide data to update");
  }
  const allowedFields = ["content", "photo", "video"];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((field) =>
    allowedFields.includes(field),
  );
  if (!isValidOperation) {
    throw new BadRequestError("you cannot update this ");
  }
  const post = await Posts.findOne({ _id: postId, postedBy: req.user.userId });
  if (!post) {
    throw new NotFoundError(`No post found with id: ${postId}`);
  }
  for (const field of updates) {
    post[field] = req.body[field];
  }
  await post.save();
  res.status(StatusCodes.OK).json({ post });
};
export const deletePost = async (req, res) => {
  const { id: postId } = req.params;
  const post = await Posts.findOneAndDelete({
    _id: postId,
    postedBy: req.user.userId,
  });
  if (!post) {
    throw new NotFoundError(`No post found with id: ${postId}`);
  }
  res.status(StatusCodes.OK).json({ msg: "post deleted successfully" });
};
