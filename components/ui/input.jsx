import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn("px-3 py-2 border rounded w-full", className)}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
