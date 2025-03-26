// components/ui/select.jsx
"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils"; // Make sure this utility exists or use clsx/classnames as fallback

export const Select = SelectPrimitive.Root;

export const SelectTrigger = ({ className, children, ...props }) => (
  <SelectPrimitive.Trigger
    className={cn(
      "inline-flex items-center justify-between rounded border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    {children}
    <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
  </SelectPrimitive.Trigger>
);

export const SelectValue = SelectPrimitive.Value;

export const SelectContent = ({ className, children, ...props }) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      side="bottom"
      align="start"
      position="popper"
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
        className
      )}
      {...props}
    >
      <SelectPrimitive.Viewport className="p-1">
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
);

export const SelectItem = ({ className, children, ...props }) => (
  <SelectPrimitive.Item
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground",
      className
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <SelectPrimitive.ItemIndicator className="absolute right-2 inline-flex items-center">
      <Check className="h-4 w-4" />
    </SelectPrimitive.ItemIndicator>
  </SelectPrimitive.Item>
);
