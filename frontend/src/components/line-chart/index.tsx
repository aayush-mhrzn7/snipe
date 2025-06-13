"use client";

import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
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

const chartConfig = {
  application: {
    label: "application",
    color: "#8CA3FF",
  },
} satisfies ChartConfig;

export default function LineChartSection() {
  const mstats = [
    { month: "Jan", approved: 20 },
    { month: "Feb", approved: 30 },
    { month: "Mar", approved: 78 },
    { month: "Apr", approved: 14 },
    { month: "May", approved: 12 },
    { month: "Jun", approved: 12 },
    { month: "Jul", approved: 25 }, // added more months if required
    { month: "Aug", approved: 35 },
    { month: "Sep", approved: 40 },
    { month: "Oct", approved: 50 },
    { month: "Nov", approved: 60 },
    { month: "Dec", approved: 70 },
  ];

  return (
    <Card className="flex justify-center flex-col font-satoshi border-none items-center h-full pt-[20px]">
      <div className="self-start flex justify-between items-center w-full px-[32px] mb-[32px]">
        <CardTitle>Data Scraped by Month</CardTitle>
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
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex justify-start items-center w-full">
        <div className="flex justify-center items-center gap-2 text-subTexts text-[14px]">
          <div className="h-[11px] w-[11px] bg-[#8CA3FF] rounded-full" />
          <p>Application</p>
        </div>
      </CardFooter>
    </Card>
  );
}
