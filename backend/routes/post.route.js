// routes/scrape.js
import express from "express";
import {
  googleScraper,
  scrapeIndividualData,
} from "../controller/post.controller.js";
import { Authenticate } from "../middleware/Verify.js";

const router = express.Router();

// Route for scraping product details
router.post("/scrape-details", Authenticate, scrapeIndividualData);
router.post("/google-scrape", Authenticate, googleScraper);

export default router;
