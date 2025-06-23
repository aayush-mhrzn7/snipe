import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    cron_value: {
      type: String,
    },
    categories: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    price: {
      type: Number,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    is_favorite: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", PostSchema);
export default Post;
