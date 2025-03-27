import * as React from "react";
import { cn } from "../../lib/utils";

function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "border rounded-lg shadow-sm",
        "bg-white text-black dark:bg-zinc-900 dark:text-white",
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }) {
  return <div className={cn("p-4", className)} {...props} />;
}

export { Card, CardContent };
