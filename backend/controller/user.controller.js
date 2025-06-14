import OTP from "../models/otp.model.js";
import User from "../models/user.model.js";
import { comparePassword, encryptPassword } from "../utils/bcrypt.js";
import {
  cookiesOptions,
  generateJWTToken,
  generateRefreshToken,
} from "../utils/jwt.js";
import { sentOTPMail, sendWelcomeMail } from "../utils/mail.js";
const signupController = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Check if any of the fields are empty
    if ([email, password, username].some((field) => field.trim() === "")) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email is Taken" });
    }

    // Encrypt the password
    const encryptedPassword = await encryptPassword(password);

    // Create a new user
    const user = await User.create({
      email,
      password: encryptedPassword,
      username,
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Server Error During Creating a new user" });
    }

    // Send the welcome mail (can be a separate function)
    sendWelcomeMail({ username: username });

    // Generate OTP for the newly created user
    const otp = Math.floor(100000 + Math.random() * 90000);

    // Check if OTP has already been sent to this email
    const otpExists = await OTP.findOne({ email });
    if (otpExists) {
      return res.status(400).json({ message: "OTP already sent" });
    }

    // Set OTP expiration time (5 minutes from now)
    const expiresIn = new Date(Date.now() + 5 * 60 * 1000);

    // Create the OTP entry in the database
    await OTP.create({ email, otp, expiresIn });

    // Send OTP mail to the user
    sentOTPMail({ otp: otp, username: user.username });

    // Respond with a success message and the user data
    res.status(201).json({
      message: "User Created Successfully, OTP Sent",
      result: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.log("error during signup", error);
    res.status(500).json({ message: "Internal Server Error During Signup" });
  }
};

const GenerateOtp = async (req, res) => {
  try {
    const otp = Math.floor(10000 + Math.random() * 9000);

    const { email } = req.body;
    if (email.trim("") == "") {
      return res.status(400).json({ message: "Email is required" });
    }
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(400).json({ message: "User not found" });
    }
    if (userExists.is_verified == true) {
      return res.status(400).json({ message: "User is already verified" });
    }
    const otpExists = await OTP.findOne({ email });
    if (otpExists) {
      return res.status(400).json({ message: "OTP already sent" });
    }
    const expiresIn = new Date(Date.now() + 5 * 60 * 1000);
    await OTP.create({ email, otp, expiresIn });
    sentOTPMail({ otp: otp, username: userExists.name });
    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.log("error during  OTP Generation", error);
    res
      .status(500)
      .json({ message: "Internal Server Error During OTP Generation" });
  }
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
    if (user.is_verified == false) {
      return res.status(400).json({ message: "User is not verified" });
    }
    const accessToken = generateJWTToken({
      id: user._id,
      email: user.email,
      name: user.name,
    });
    console.log(accessToken);
    const refreshToken = generateRefreshToken({
      id: user._id,
      email: user.email,
      name: user.name,
    });
    return res
      .cookie("refreshToken", refreshToken, cookiesOptions)
      .cookie("accessToken", accessToken, cookiesOptions)
      .status(200)
      .json({
        message: "Login Successfull",
        result: {
          id: user._id,
          email: user.email,
          name: user.name,
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      });
  } catch (error) {
    console.log("error during login", error);
    res.status(500).json({ message: "Internal Server Error During Login" });
  }
};

const RegenerateOtp = async (req, res) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000);

    const { email } = req.body;
    if (email.trim("") == "") {
      return res.status(400).json({ message: "Email is required" });
    }
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(400).json({ message: "User not found" });
    }
    if (userExists.is_verified == true) {
      return res.status(400).json({ message: "User is already verified" });
    }
    const otpExists = await OTP.findOne({ email });
    if (!otpExists) {
      return res.status(400).json({ message: "OTP not found" });
    }
    const expiresIn = new Date(Date.now() + 5 * 60 * 1000);
    await OTP.findOneAndUpdate({ email }, { otp, expiresIn });
    sentOTPMail({ otp: otp, username: userExists.name });
    return res.status(200).json({ message: "OTP re-sent successfully" });
  } catch (error) {
    console.log("error during  OTP Generation", error);
    res
      .status(500)
      .json({ message: "Internal Server Error During OTP Generation" });
  }
};
const VerifyOTP = async (req, res) => {
  try {
    const { otp, email } = req.body;
    if ([otp, email].some((field) => field.trim("") === "")) {
      return res.status(400).json({ message: "All Fields are required" });
    }
    const otpExists = await OTP.findOne({ $and: [{ email }, { otp }] });

    if (!otpExists) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (otpExists.expiresIn < Date.now()) {
      return res.status(400).json({ message: "OTP Expired Resend The OTP" });
    }
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res
        .status(400)
        .json({ message: "User with this email was not found " });
    }
    if (otpExists.otp != otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    await User.updateOne({ email }, { is_verified: true });
    await OTP.deleteOne({ email });
    return res.status(200).json({ message: "User Verified Sucessfully" });
  } catch (error) {
    console.log("error during login", error);
    res.status(500).json({ message: "Internal Server Error During Login" });
  }
};
const forgetPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    if (email.trim("") == "") {
      return res.status(400).json({ message: "Email is required" });
    }
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res
        .status(400)
        .json({ message: "User with this email was not found " });
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    const expiresIn = new Date(Date.now() + 5 * 60 * 1000);
    await OTP.deleteOne({ email });
    await OTP.create({ email, otp, expiresIn });
    sentOTPMail({ otp: otp, username: userExists.name });
    return res.status(200).json({ message: "OTP sent successfully to email" });
  } catch (error) {
    console.log("error during  OTP Generation", error);
    res
      .status(500)
      .json({ message: "Internal Server Error During OTP Generation" });
  }
};
const VerifyResetPassword = async (req, res) => {
  try {
    const { otp, email } = req.body;
    if ([otp, email].some((field) => field.trim("") === "")) {
      return res.status(400).json({ message: "All Fields are required" });
    }
    const otpExists = await OTP.findOne({ $and: [{ email }, { otp }] });

    if (!otpExists) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (otpExists.expiresIn < Date.now()) {
      return res.status(400).json({ message: "OTP Expired Resend The OTP" });
    }
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res
        .status(400)
        .json({ message: "User with this email was not found " });
    }

    await OTP.deleteOne({ email });
    return res.status(200).json({ message: "OTP Verified Sucessfully" });
  } catch (error) {
    console.log("error during login", error);
    res.status(500).json({ message: "Internal Server Error During Login" });
  }
};
const resetPasswordController = async (req, res) => {
  try {
    const { email, password, confirm_password } = req.body;
    if (
      [password, email, confirm_password].some((field) => field.trim("") === "")
    ) {
      return res.status(400).json({ message: "All Fields are required" });
    }

    if (password != confirm_password) {
      return res.status(400).json({ message: "Password does not match" });
    }

    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res
        .status(400)
        .json({ message: "User with this email was not found " });
    }
    const encryptedPassword = await encryptPassword(password);
    await User.updateOne({ email }, { password: encryptedPassword });

    return res.status(200).json({ message: "Password Reset Successfully" });
  } catch (error) {
    console.log("error during login", error);
    res.status(500).json({ message: "Internal Server Error During Login" });
  }
};

export {
  signupController,
  loginController,
  GenerateOtp,
  VerifyOTP,
  VerifyResetPassword,
  forgetPasswordController,
  resetPasswordController,
  RegenerateOtp,
};
