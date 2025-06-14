import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const ChatBox = () => {
  const date = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  console.log(date);
  return (
    <>
      <div className="h-[400px] w-full overflow-y-auto scroll-m-0.5 rounded-md border border-primary-border">
        <div className="flex justify-start w-full">
          <div className="p-2 m-2">
            <span className="p-2 w-[200px] block bg-success-foreground  rounded-md">
              Hello Aayush 👋 how may i help you today!
            </span>
            <span className="text-[10px]">{date}</span>
          </div>
        </div>

        <div className="flex justify-end w-full">
          <div className="p-2 flex  flex-col items-end m-2">
            <span className="w-[200px] block bg-primary-foreground p-2 rounded-md">
              Based on the Data provided in the current page which is the better
              deal that i should take
            </span>
            <span className="text-[10px]">{date}</span>
          </div>
        </div>
      </div>
      <div>
        <div className="flex gap-2 mt-4">
          <Input type="text" /> <Button>Send</Button>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
