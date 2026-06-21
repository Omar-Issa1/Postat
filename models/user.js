import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "pls provdide a username"],
      trim: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
    },
    fullname: {
      firstname: {
        type: String,
        required: [true, "pls provdide the firstname"],
        trim: true,
        minlength: 3,
        maxlength: 20,
      },
      lastname: {
        type: String,
        required: [true, "pls provdide the lastname"],
        trim: true,
        minlength: 3,
        maxlength: 20,
      },
    },
    email: {
      type: String,
      required: [true, "pls provdide an email"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: "please provide a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 8,
      select: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      userId: this._id,
      username: this.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    },
  );
};

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

const User = mongoose.model("User", userSchema);

export default User;
