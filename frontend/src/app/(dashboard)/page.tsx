import LineChartSection from "@/components/line-chart";

import { CheckedIcon, RefreshIcon, TotalListingIcon } from "@/assets/icons";
import AnalyticsCard from "@/components/analytics-card";
import { ChartBarMultiple } from "@/components/bar-chart";
import ComparisonLineChart from "@/components/comparison-line-chart";
import { DataTableDemo } from "@/components/table";
import { Separator } from "@/components/ui/separator";
import { Bookmark } from "lucide-react";
export default function Page() {
  return (
    <>
      <h2 className="text-2xl my-4 font-bold font-satoshi">
        {(() => {
          const hour = new Date().getHours();
          if (hour >= 0 && hour < 12) {
            return "Good morning Aayush 👋";
          } else if (hour >= 12 && hour < 17) {
            return "Good afternoon Aayush 👋";
          } else {
            return "Good evening Aayush 👋";
          }
        })()}
      </h2>
      <div className="flex flex-wrap mb-6 gap-6">
        <AnalyticsCard
          icon={<TotalListingIcon />}
          title="Total Listings"
          value="250"
        />
        <AnalyticsCard
          icon={<RefreshIcon />}
          title=" Avg Scraping Frequency"
          value="3 days"
        />
        <AnalyticsCard icon={<CheckedIcon />} title="Active Jobs" value="30" />
        <AnalyticsCard icon={<Bookmark />} title="Saved Posts" value="12" />
      </div>
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
        <div className="h-full w-full">
          <ChartBarMultiple />
        </div>
        <div className="h-full w-full">
          <LineChartSection />
        </div>{" "}
      </div>
      <div className="mx-auto py-6 container">
        <DataTableDemo
          title="Posts Scheduled for today"
          subheading="View the posts scheduled for today"
        />
      </div>
      <div className=" w-full">
        <ComparisonLineChart />
      </div>
      <Separator className="my-4" />
      <div className="mx-auto py-2 container">
        <DataTableDemo />
      </div>
    </>
  );
}
