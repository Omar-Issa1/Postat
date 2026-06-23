import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongoDB Successfully");
  } catch (error) {
    console.log("connection faild", error.message);
    process.exit(1);
  }
};

export default connectDB;
