import { useState } from "react";

export function Select({ value, onValueChange, children }) {
  const [open, setOpen] = useState(false);
  return children({ value, onValueChange, open, setOpen });
}

export function SelectTrigger({ children, className = "", onClick }) {
  return (
    <div
      className={`border px-3 py-2 rounded cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function SelectValue({ placeholder }) {
  return <span>{placeholder}</span>;
}

export function SelectContent({ children, open, className = "" }) {
  if (!open) return null;
  return <div className={`mt-2 rounded border shadow p-2 ${className}`}>{children}</div>;
}

export function SelectItem({ value, children, onSelect }) {
  return (
    <div
      className="p-2 hover:bg-purple-100 cursor-pointer"
      onClick={() => onSelect(value)}
    >
      {children}
    </div>
  );
}
