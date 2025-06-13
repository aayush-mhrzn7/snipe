import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
interface props {
  trigger: React.ReactNode;
  content: React.ReactNode;
}
const CustomToolTip = ({ trigger, content }: props) => {
  return (
    <Tooltip>
      <TooltipTrigger className="flex justify-center items-center">
        {trigger}
      </TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  );
};

export default CustomToolTip;
