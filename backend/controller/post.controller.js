import Post from "../models/post.model.js";
import Cron from "../models/cron.model.js";
import { main } from "../scrape.js";
import { scrapeProductDetails } from "../urlscrape.js";
import mongoose from "mongoose";

const scrapeIndividualData = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { url } = req.body;

    if (url.trim("") == "") {
      return res.status(400).json({ message: "URL is required" });
    }

    const data = await scrapeProductDetails({ url });

    // Check if scraping was successful
    if (data) {
      res.status(200).json(data); // Send data as a JSON response
    } else {
      res.status(500).json({ message: "Failed to scrape product details." });
    }
  } catch (error) {
    console.error("❌ Error during scraping:", error);
    res.status(500).json({
      message: "Error occurred during scraping.",
      error: error.message,
    });
  }
};
const googleScraper = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { google_query, no_of_links } = req.body;
    if ([google_query, no_of_links].some((field) => field.trim("") === "")) {
      return res.status(400).json({ message: "All Fields are required" });
    }
    const data = await main({ google_query, no_of_links }); // Run the main scraping function

    // Check if scraping was successful
    if (data && data.length > 0) {
      res.status(200).json({ result: data, message: "successfully scraped" }); // Send data as a JSON response
    } else {
      res.status(500).json({ message: "Failed to scrape product details." });
    }
  } catch (error) {
    console.error("❌ Error during scraping:", error);
    res.status(500).json({
      message: "Error occurred during scraping.",
      error: error.message,
    });
  }
};

const CreatePost = async (req, res) => {
  try {
    const { title, cron_value, price, categories, is_favorite } = req.body;
    console.log(req.body);
    if (
      [title, cron_value, price, categories, is_favorite].some(
        (field) => field.trim("") === ""
      )
    ) {
      return res.status(400).json({ message: "All Fields are required" });
    }
    const user = req.user;
    console.log(req.user, "user");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const post = await Post.create({
      title,
      cron_value,
      price,
      categories,
      is_favorite,
      created_by: user,
    });
    if (!post) {
      return res
        .status(400)
        .json({ message: "Server Error During Creating a new post" });
    }

    const cron = await Cron.create({
      cron_value,
      postId: post._id,
    });
    if (!cron) {
      return res
        .status(400)
        .json({ message: "Server Error During Creating a new cron" });
    }
    return res.status(200).json({ message: "Post created successfully" });
  } catch (error) {}
};
const getPosts = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const posts = await Post.find({ created_by: user });
    if (!posts) {
      return res
        .status(400)
        .json({ message: "Server Error During Creating a new post" });
    }
    return res.status(200).json({ result: posts, message: "success" });
  } catch (error) {
    return res.status(500).json({
      message: "Error occurred during scraping.",
      error: error.message,
    });
  }
};
const updatePosts = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, cron_value, price, categories, is_favorite } = req.body;

    if (
      [title, cron_value, price, categories, is_favorite].some(
        (field) => field?.toString().trim() === ""
      )
    ) {
      return res.status(400).json({ message: "All Fields are required" });
    }

    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Update post
    const post = await Post.findOneAndUpdate(
      { _id: id, created_by: user },
      { title, cron_value, price, categories, is_favorite },
      { new: true }
    );

    if (!post) {
      return res
        .status(400)
        .json({ message: "Server Error During Updating post" });
    }

    // Update cron - convert id to string to match existing data
    const cron = await Cron.findOneAndUpdate(
      { postId: id.toString() },
      { cron_value },
      { new: true }
    );

    if (!cron) {
      console.log(`No cron found with postId: ${id}`);
      // You might want to create a new cron if not found, depending on your requirements
      return res.status(400).json({ message: "Cron not found for this post" });
    }

    return res.status(200).json({ result: post, message: "success" });
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
const deletePosts = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    const deletedCron = await Cron.deleteOne({ postId: id });
    if (!deletedCron) {
      return res.status(404).json({ message: "Cron not found" });
    }
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
export {
  googleScraper,
  scrapeIndividualData,
  getPosts,
  CreatePost,
  updatePosts,
  deletePosts,
};
