import express from "express";
import {
  forgetPasswordController,
  GenerateOtp,
  loginController,
  RegenerateOtp,
  resetPasswordController,
  signupController,
  VerifyOTP,
  VerifyResetPassword,
} from "../controller/user.controller.js";
const router = express.Router();
router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/generate-otp", GenerateOtp);
router.post("/verify-otp", VerifyOTP);
router.post("/regenerate-otp", RegenerateOtp);
router.post("/verify-reset-password", VerifyResetPassword);
router.post("/forget-password", forgetPasswordController);
router.post("/reset-password", resetPasswordController);
export default router;
