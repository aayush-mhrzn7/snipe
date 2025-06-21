import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
const index = ({
  variant,
  icon,
  title,
  description,
}: {
  variant: "default" | "destructive";
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <Alert variant={variant}>
      {icon}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default index;
