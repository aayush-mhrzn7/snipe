import mongoose from "mongoose";

const CronSchema = new mongoose.Schema(
  {
    cron_value: {
      type: String,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  {
    timestamps: true,
  }
);

const Cron = mongoose.model("Cron", CronSchema);
export default Cron;
