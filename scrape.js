import puppeteer from "puppeteer";
import fs from "fs";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Enhanced currency detection pattern
const CURRENCY_PATTERN =
  /(रु|Rs\.?|₹|\$|€|£|NPR|USD|AUD|CAD|INR|¥|₩|₽|฿|Fr|₪|₺|₴|₫|₸|₡|₱|₦|₲|₵|₼|₾|₿)\s?(\d[\d,.]*)/i;

export async function main({ google_query, no_of_links }) {
  const scrapedLinks = new Set();
  const visitedUrls = new Set();
  const productCache = new Set(); // To track unique products
  const query = google_query;

  const MAX_LINKS = no_of_links || 2;
  const browser = await puppeteer.launch({
    headless: false,
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

  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
    query
  )}`;
  await page.goto(searchUrl, { waitUntil: "domcontentloaded" });

  async function extractResults() {
    if (scrapedLinks.size >= MAX_LINKS) return;

    await delay(1500);
    const links = await page.$$eval("a h3", (nodes) => {
      return nodes
        .map((h3) => {
          const anchor = h3.closest("a");
          if (anchor) {
            return {
              title: h3.innerText,
              url: anchor.href,
            };
          }
          return null;
        })
        .filter(Boolean);
    });

    for (const obj of links) {
      if (scrapedLinks.size >= MAX_LINKS) break;
      scrapedLinks.add(JSON.stringify(obj));
    }
  }

  async function goToNextPage(pageIndex) {
    try {
      await delay(2000);
      const nextBtn = await page.$("a#pnnext");
      if (!nextBtn) return false;

      await page.evaluate(() => {
        const next = document.querySelector("a#pnnext");
        if (next) next.scrollIntoView({ behavior: "instant", block: "center" });
      });

      await Promise.all([
        page.waitForNavigation({
          waitUntil: "domcontentloaded",
          timeout: 10000,
        }),
        page.evaluate(() => {
          const next = document.querySelector("a#pnnext");
          if (next) next.click();
        }),
      ]);

      return true;
    } catch {
      return false;
    }
  }

  function normalizePrice(priceStr) {
    if (!priceStr) return null;

    // Remove thousands separators and normalize decimal points
    const normalized = priceStr
      .replace(/[,\s]/g, "")
      .replace(/\.(\d{3})/g, "$1") // Handle European-style thousands
      .replace(/,(\d{2})$/, ".$1"); // Handle European-style decimals

    // Extract currency and amount
    const match = normalized.match(CURRENCY_PATTERN);
    if (!match) return null;

    const currency = match[1].trim();
    const amount = parseFloat(match[2]);

    if (isNaN(amount)) return null;

    return {
      currency,
      amount,
      display: `${currency} ${amount.toLocaleString()}`,
    };
  }

  function createProductKey(product) {
    // Create a unique key based on image URL, product URL, and price
    const imageKey = product.image
      ? product.image.split("?")[0].split("#")[0]
      : "";
    const hrefKey = product.href
      ? product.href.split("?")[0].split("#")[0]
      : "";
    const priceKey = product.normalizedPrice
      ? product.normalizedPrice.amount
      : "";
    return `${imageKey}|${hrefKey}|${priceKey}`;
  }

  async function scrapeProducts(detailPage) {
    try {
      const rawProducts = await detailPage.evaluate((CURRENCY_PATTERN) => {
        const items = [];
        const allElements = Array.from(document.querySelectorAll("*"));

        const productElements = allElements.filter((el) => {
          const classNames = Array.from(el.classList || []);
          const id = el.id || "";
          return (
            classNames.some((cls) => /product|item|card/i.test(cls)) ||
            /product|item|card/i.test(id)
          );
        });

        productElements.forEach((el) => {
          let image = null;
          let link = null;
          let price = null;

          // Find image (prioritize srcset and data-src attributes)
          const img = el.querySelector("img");
          if (img) {
            image =
              img.srcset?.split(",")[0]?.split(" ")[0] ||
              img.dataset?.src ||
              img.src;
          }

          // Find link (prioritize product links)
          const links = Array.from(el.querySelectorAll("a[href]"));
          if (links.length) {
            const productLink = links.find(
              (a) =>
                /product|item|card|buy|shop/i.test(a.href) ||
                /product|item|card|buy|shop/i.test(a.textContent)
            );
            link = productLink?.href || links[0].href;
          }

          // Find price (look in the element and its children)
          const text = el.innerText || "";
          const priceRegex = new RegExp(CURRENCY_PATTERN.source, "i");
          const priceMatch = text.match(priceRegex);
          if (priceMatch) {
            price = priceMatch[0];
          }

          // Only include complete products
          if (image && link && price) {
            items.push({
              image,
              href: link,
              price,
              title:
                el.querySelector("h1,h2,h3,h4,h5,h6")?.innerText?.trim() || "",
            });
          }
        });

        return items;
      }, CURRENCY_PATTERN.source);

      // Normalize and filter products
      const normalizedProducts = rawProducts
        .map((product) => ({
          ...product,
          normalizedPrice: normalizePrice(product.price),
        }))
        .filter(
          (product) =>
            product.image &&
            product.href &&
            product.normalizedPrice &&
            !product.href.startsWith("javascript:") &&
            !product.image.startsWith("data:")
        );

      return normalizedProducts;
    } catch (err) {
      return [];
    }
  }

  async function VisitPage(url) {
    try {
      const detailPage = await browser.newPage();
      await detailPage.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      );

      // Set timeout for the page
      detailPage.setDefaultTimeout(15000);

      await detailPage.goto(url, {
        waitUntil: "domcontentloaded",
        timeout: 20000,
      });
      await delay(3000);

      // Scroll through the page to trigger lazy loading
      await detailPage.evaluate(async () => {
        await new Promise((resolve) => {
          let totalHeight = 0;
          const distance = 200;
          const timer = setInterval(() => {
            const scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;
            if (totalHeight >= scrollHeight) {
              clearInterval(timer);
              resolve();
            }
          }, 200);
        });
      });

      let products = await scrapeProducts(detailPage);

      // If no products found, try looking for more generic patterns
      if (products.length === 0) {
        products = await detailPage.evaluate(() => {
          const items = [];
          // Look for any elements that might contain product info
          const potentialProducts = document.querySelectorAll(
            ".product, .item, .card, [class*='product'], [class*='item'], [class*='card']"
          );

          potentialProducts.forEach((el) => {
            const img = el.querySelector("img");
            const link = el.querySelector("a[href]");
            const priceEl = el.querySelector(".price, [class*='price']");

            if (img && link && priceEl) {
              items.push({
                image: img.src,
                href: link.href,
                price: priceEl.innerText.trim(),
                title:
                  el.querySelector("h1,h2,h3,h4,h5,h6")?.innerText?.trim() ||
                  "",
              });
            }
          });

          return items;
        });

        // Normalize these products too
        products = products
          .map((product) => ({
            ...product,
            normalizedPrice: normalizePrice(product.price),
          }))
          .filter(
            (product) =>
              product.image &&
              product.href &&
              product.normalizedPrice &&
              !product.href.startsWith("javascript:") &&
              !product.image.startsWith("data:")
          );
      }

      await detailPage.close();

      // Deduplicate products before returning
      const uniqueProducts = [];
      for (const product of products) {
        const key = createProductKey(product);
        if (!productCache.has(key)) {
          productCache.add(key);
          uniqueProducts.push(product);
        }
      }

      return uniqueProducts;
    } catch (err) {
      console.warn(`⚠️ Failed to scrape: ${url}`, err.message);
      return [];
    }
  }

  let hasNext = true;
  let pageIndex = 1;

  while (hasNext && scrapedLinks.size < MAX_LINKS) {
    const currentUrl = page.url();
    if (visitedUrls.has(currentUrl)) break;

    visitedUrls.add(currentUrl);

    await extractResults();
    if (scrapedLinks.size >= MAX_LINKS) break;

    hasNext = await goToNextPage(++pageIndex);
  }

  const finalData = Array.from(scrapedLinks).map((item) => JSON.parse(item));

  for (let i = 0; i < finalData.length; i++) {
    const item = finalData[i];

    item.products = await VisitPage(item.url);
    await delay(2000 + Math.random() * 1000); // Random delay to avoid detection
  }

  // Filter out entries with no products
  const filteredData = finalData.filter(
    (item) => item.products && item.products.length > 0
  );

  await browser.close();
  return filteredData;
}
