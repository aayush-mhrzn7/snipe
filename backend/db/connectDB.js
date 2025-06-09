import mongoose from "mongoose";

export const ConnectDb = () => {
  mongoose
    .connect(String(process.env.MONGO_URL))
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.log(err);
    });
};
