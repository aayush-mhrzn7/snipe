import { ProductData } from "./scraper.interface";

export interface APIResults<T> {
  status: number;
  data: T;
}
export interface ScraperResultItem {
  title: string;
  url: string;
  products: ProductData[];
}
export interface ScraperResults {
  result: ScraperResultItem[];
  message: string;
}
