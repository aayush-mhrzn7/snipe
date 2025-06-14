import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
const index = ({
  trigger,
  content,
}: {
  trigger: React.ReactNode;
  content: React.ReactNode;
}) => {
  return (
    <Popover>
      <PopoverTrigger className="flex justify-center items-center">
        {trigger}
      </PopoverTrigger>
      <PopoverContent className="w-fit p-2 m-4">{content}</PopoverContent>
    </Popover>
  );
};

export default index;
