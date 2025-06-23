// routes/scrape.js
import express from "express";
import {
  CreatePost,
  deletePosts,
  getPosts,
  googleScraper,
  scrapeIndividualData,
  updatePosts,
} from "../controller/post.controller.js";
import { Authenticate } from "../middleware/Verify.js";

const router = express.Router();

// Route for scraping product details
router.post("/scrape-details", Authenticate, scrapeIndividualData);
router.post("/google-scrape", Authenticate, googleScraper);
router.get("/", Authenticate, getPosts);
router.post("/", Authenticate, CreatePost);
router.patch("/:id", Authenticate, updatePosts);
router.delete("/:id", Authenticate, deletePosts);
export default router;
