import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import postsRoute from "./routes/posts.js";
import authRouter from "./routes/auth.js";
import authenticateUser from "./middleware/authentication.js";

app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", authenticateUser, postsRoute);

const port = process.env.PORT || 8080;
const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  } catch (error) {
    console.log("server error:", error);
  }
};
start();
