// routes/scrape.js
import express from "express";
import { scrapeProductDetails } from "../urlscrape.js"; // Path to your scraper
import { main } from "../scrape.js";

const router = express.Router();

// Route for scraping product details
router.post("/scrape-details", async (req, res) => {
  try {
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
});
router.post("/google-scrape", async (req, res) => {
  try {
    const { google_query, no_of_links } = req.body;
    if ([google_query, no_of_links].some((field) => field.trim("") === "")) {
      return res.status(400).json({ message: "All Fields are required" });
    }
    const data = await main({ google_query, no_of_links }); // Run the main scraping function

    // Check if scraping was successful
    if (data && data.length > 0) {
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
});

export default router;
