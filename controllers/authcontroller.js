import User from "../models/user.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
const register = async (req, res) => {
  const { username, fullname, email, password } = req.body;
  const user = await User.create({ username, fullname, email, password });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      fullname: user.fullname,
      username: user.username,
      email: user.email,
    },
    token,
  });
};
const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("Pls provide the username and password");
  }
  const user = await User.findOne({ username });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ username }, token);
};
export { register, login };
