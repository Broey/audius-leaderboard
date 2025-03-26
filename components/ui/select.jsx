// components/ui/select.jsx
import { useState } from "react";

export function Select({ value, onValueChange, children }) {
  // Simply render children as provided
  return <div>{children}</div>;
}
export function SelectTrigger({ children, className = "" }) {
  return <div className={`border px-3 py-2 rounded cursor-pointer ${className}`}>{children}</div>;
}
export function SelectValue({ placeholder }) {
  return <span>{placeholder}</span>;
}
export function SelectContent({ children, className = "" }) {
  return <div className={`mt-2 rounded border shadow p-2 ${className}`}>{children}</div>;
}
export function SelectItem({ value, children }) {
  return (
    <div
      className="p-2 hover:bg-purple-100 cursor-pointer"
      onClick={() => alert(`Set season to ${value}`)}
    >
      {children}
    </div>
  );
}
