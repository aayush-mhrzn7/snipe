import express from "express";
import {
  loginController,
  signupController,
} from "../controller/user.controller.js";
const router = express.Router();
router.get("/signup", signupController);
router.get("/login", loginController);
export default router;
