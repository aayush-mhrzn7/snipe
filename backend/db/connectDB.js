import mongoose from "mongoose";

export const ConnectDb = () => {
  mongoose
    .connect(
      "mongodb+srv://aayushmaharjan497:3sND4YI50UzAy91v@snipe.pmd5gul.mongodb.net/"
    )
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.log(err);
    });
};
