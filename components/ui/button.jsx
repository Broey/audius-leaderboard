import * as React from "react";
import { cn } from "@/lib/utils";

const Button = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn("px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700", className)}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button };
