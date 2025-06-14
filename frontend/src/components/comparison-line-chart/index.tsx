"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  application: {
    label: "application",
    color: "#8CA3FF",
  },
  computer: {
    label: "computer",
    color: "#4ADE80", // Green color for the new line
  },
} satisfies ChartConfig;

export default function ComparisonLineChart() {
  const mstats = [
    { month: "Jan", approved: 20, comparison: 5 },
    { month: "Feb", approved: 30, comparison: 15 },
    { month: "Mar", approved: 48, comparison: 90 },
    { month: "Apr", approved: 98, comparison: 80 },
    { month: "May", approved: 78, comparison: 68 },
    { month: "Jun", approved: 12, comparison: 75 },
    { month: "Jul", approved: 25, comparison: 30 },
    { month: "Aug", approved: 35, comparison: 20 },
    { month: "Sep", approved: 40, comparison: 45 },
    { month: "Oct", approved: 50, comparison: 55 },
    { month: "Nov", approved: 60, comparison: 65 },
    { month: "Dec", approved: 70, comparison: 75 },
  ];

  return (
    <Card className="flex justify-center flex-col font-satoshi border items-center h-full pt-[20px]">
      <div className="self-start flex justify-between items-center w-full px-[32px] mb-[32px]">
        <CardTitle>Compare Prices of Mac Mini M4 and Macbook Air M3</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </div>
      <CardContent className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300">
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={mstats}
            margin={{ left: 0, right: 12 }}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={0}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              dataKey={"approved"}
              tickCount={6}
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="approved"
              type="linear"
              fill="rgba(140, 163, 255, 0.30)"
              fillOpacity={0.4}
              stroke="#8CA3FF"
              dot
            />
            <Area
              dataKey="comparison"
              type="linear"
              fill="rgba(74, 222, 128, 0.30)"
              fillOpacity={0.4}
              stroke="#4ADE80"
              dot
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex justify-start items-center w-full gap-4">
        <div className="flex justify-center items-center gap-2 text-subTexts text-[14px]">
          <div className="h-[11px] w-[11px] bg-[#8CA3FF] rounded-full" />
          <p>Mac mini</p>
        </div>
        <div className="flex justify-center items-center gap-2 text-subTexts text-[14px]">
          <div className="h-[11px] w-[11px] bg-[#4ADE80] rounded-full" />
          <p>Mac Book Air</p>
        </div>
      </CardFooter>
    </Card>
  );
}
