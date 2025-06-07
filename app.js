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
app.use("/api", userRouter);
// Database Connection

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
