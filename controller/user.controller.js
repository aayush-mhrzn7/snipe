import User from "../models/user.model.js";
import { comparePassword, encryptPassword } from "../utils/bcrypt.js";
import {
  cookiesOptions,
  generateJWTToken,
  generateRefreshToken,
} from "../utils/jwt.js";
const signupController = async (req, res) => {
  //   try {
  console.log(req.body);
  const { email, password, name } = req.body;
  console.log(email, password, name);
  if ([email, password, name].some((field) => field.trim("") === "")) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "Email is Taken" });
  }
  const encryptedPassword = await encryptPassword(password);
  const user = await User.create({
    email,
    password: encryptedPassword,
    name,
  });
  if (!user) {
    return res
      .status(400)
      .json({ message: "Server Error During Creating a new user" });
  }
  const accessToken = generateJWTToken({ id: user._id });
  const refreshToken = generateRefreshToken({ id: user._id });

  res
    .cookie("refreshToken", refreshToken, cookiesOptions)
    .cookie("accessToken", accessToken, cookiesOptions)
    .status(201)
    .json({ message: "User Created Successfully", result: user });
  //   } catch (error) {
  //     console.log("error during signup", error);
  //     res.status(500).json({ message: "Internal Server Error During Signup" });
  //   }
};
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if ([email, password].some((field) => field.trim("") === "")) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const accessToken = generateJWTToken({ id: user._id });
    const refreshToken = generateRefreshToken({ id: user._id });
    return res
      .cookie("refreshToken", refreshToken, cookiesOptions)
      .cookie("accessToken", accessToken, cookiesOptions)
      .status(200)
      .json({ message: "Login Successfull", result: user });
  } catch (error) {
    console.log("error during login", error);
    res.status(500).json({ message: "Internal Server Error During Login" });
  }
};
// TODO: add nodemailer here too
const forgetPasswordController = () => {};
const resetPasswordController = () => {};

export {
  signupController,
  loginController,
  forgetPasswordController,
  resetPasswordController,
};
