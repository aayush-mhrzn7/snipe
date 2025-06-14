import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  icon: React.ReactNode;
  title: string;
  value: string;
  className?: string;
};
const index = ({ icon, title, value, className }: Props) => {
  return (
    <div
      className={cn(
        "flex gap-3 items-center border font-satoshi bg-white p-4  rounded-md border-primary-border shadow-xs",
        className
      )}
    >
      <div className="p-4 h-fit w-fit rounded-md border border-primary-border bg-primary-foreground text-primary">
        {icon}
      </div>
      <div className="flex flex-col">
        <p className="text-muted-foreground text-sm">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default index;
