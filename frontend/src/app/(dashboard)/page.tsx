import LineChartSection from "@/components/line-chart";

import { ChartBarMultiple } from "@/components/bar-chart";
import { DataTableDemo } from "@/components/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <>
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
        <div className="h-full w-full">
          <ChartBarMultiple />
        </div>
        <div className="h-full w-full">
          <LineChartSection />
        </div>
      </div>
      <Separator className="my-4" />
      <div className="mx-auto py-2 container">
        <DataTableDemo />
      </div>

      <div className="flex gap-2">
        <Badge asChild>
          <Link href="/">Badge</Link>
        </Badge>
        <Badge asChild variant={"success"}>
          <Link href="/">Badge</Link>
        </Badge>
        <Badge asChild variant={"warning"}>
          <Link href="/">Warning</Link>
        </Badge>
        <Badge asChild variant={"destructive"}>
          <Link href="/">Badge</Link>
        </Badge>
      </div>
    </>
  );
}
