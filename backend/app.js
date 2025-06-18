import express from "express";

import cors from "cors";
import { ConnectDb } from "./db/connectDB.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
ConnectDb();

app.use(
  cors({
    origin: ["http://localhost:3000", "*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import categoryRouter from "./routes/category.route.js";

app.use("/api", userRouter);
app.use("/api", postRouter);
app.use("/api", categoryRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
