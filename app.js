import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";

app.get("/", (req, res) => {
  res.send("hello worled ");
});
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
