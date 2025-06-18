import { GoogleScrapperFormSchema } from "@/utils/schema/scraper.schema";
import { axiosInstance, getBody } from "./api.service";

const googleScraper = (body: GoogleScrapperFormSchema) => {
  return axiosInstance.post("/google-scrape", getBody(body));
};

export { googleScraper };
