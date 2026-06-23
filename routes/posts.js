import express from "express";
const router = express.Router();
import {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
} from "../controllers/postscontrollers.js";
router.route("/").post(createPost).get(getAllPosts);
router.route("/:id").patch(updatePost).delete(deletePost);
export default router;
