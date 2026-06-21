import express from "express";
const router = express.Router();
import { createPost, getAllPosts } from "../controllers/postscontrollers.js";
router.route("/").post(createPost).get(getAllPosts);
export default router;
