// urlscrape.js
import puppeteer from "puppeteer";

export async function scrapeProductDetails({ url }) {
  const PRODUCT_URL = url;

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-blink-features=AutomationControlled",
      "--window-size=1366,768",
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1024 });
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  );

  try {
    await page.goto(PRODUCT_URL, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    // Scroll through the page to trigger lazy loading
    await autoScroll(page);

    const productDetails = await page.evaluate(() => {
      // Helper function to clean text
      const cleanText = (text) =>
        text ? text.replace(/\s+/g, " ").trim() : null;

      // Extract title
      const title =
        cleanText(document.querySelector("h1.product-title")?.textContent) ||
        cleanText(document.title);

      // Extract price - trying multiple selectors and regex
      let price = null;
      const priceSelectors = [
        ".price",
        ".product-price",
        ".amount",
        ".woocommerce-Price-amount",
        "[itemprop='price']",
      ];

      // Check for price using selectors
      for (const selector of priceSelectors) {
        const priceElement = document.querySelector(selector);
        if (priceElement && priceElement.textContent) {
          price = cleanText(priceElement.textContent);
          if (price) break;
        }
      }

      // Fallback: Regex match for price with common currency symbols
      if (!price) {
        const bodyText = document.body.innerText;
        const regex =
          /(रु|Rs\.?|₹|\$|€|£|NPR|USD|AUD|CAD|INR|¥|₩|₽|฿|Fr|₪|₺|₴|₫|₸|₡|₱|₦|₲|₵|₼|₾|₿)\s?(\d[\d,\.]*)/i;
        const match = bodyText.match(regex);
        if (match) {
          price = match[0];
        }
      }

      // Extract image - prioritize high-res images
      let imageUrl = null;
      const imageSelectors = [
        ".woocommerce-product-gallery__image img",
        ".product-image img",
        ".main-image img",
        "img.wp-post-image",
        "img[itemprop='image']",
      ];

      for (const selector of imageSelectors) {
        const imgElement = document.querySelector(selector);
        if (imgElement) {
          imageUrl =
            imgElement.getAttribute("src") ||
            imgElement.getAttribute("data-src") ||
            imgElement.getAttribute("data-large_image") ||
            imgElement.getAttribute("srcset")?.split(" ")[0];
          if (imageUrl) break;
        }
      }

      // Extract description if available
      const description = cleanText(
        document.querySelector(".product-description")?.textContent ||
          document.querySelector("[itemprop='description']")?.textContent ||
          document.querySelector(
            ".woocommerce-product-details__short-description"
          )?.textContent
      );

      // Extract availability
      const availability = cleanText(
        document.querySelector(".stock")?.textContent ||
          document.querySelector("[itemprop='availability']")?.textContent
      );

      return {
        title,
        price,
        imageUrl,
        description,
        availability,
        url: window.location.href,
        scrapedAt: new Date().toISOString(),
      };
    });

    return productDetails; // Return scraped details directly
  } catch (error) {
    console.error("❌ Error during scraping:", error);
    return null;
  } finally {
    await browser.close();
  }
}

// Helper function to auto-scroll the page
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 300; // Increased scroll distance
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 150); // Added delay for smoother loading
    });
  });
}
