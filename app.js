import express from "express";

import cors from "cors";
import { ConnectDb } from "./db/connectDB.js";
import dotenv from "dotenv";
dotenv.config(); // Make sure this is first

const app = express();
ConnectDb();
//Basic Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

//Routes
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
// import { sentOTPMail } from "./utils/mail.js";
// sentOTPMail({ otp: "1234", username: "aayush" });
app.use("/api", userRouter);
app.use("/api", postRouter);
// Database Connection

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
