import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ScraperResultItem } from "../interface/api.interface";

type ScraperState = {
  scraper: ScraperResultItem[];
  setScraper: (scraper: ScraperResultItem[]) => void;
};
const useScraperStore = create<ScraperState>(
  // @ts-ignore
  persist(
    (set) => ({
      scraper: [],
      setScraper: (scraper: ScraperResultItem[]) => set({ scraper }),
    }),
    {
      name: "scraper-storage", // unique name for local storage
    }
  )
);

export default useScraperStore;
