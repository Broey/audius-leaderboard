import { useState } from "react";

export function Select({ value, onValueChange, children }) {
  return children({ value, onValueChange });
}

export function SelectTrigger({ children, className = "", onClick }) {
  return (
    <button
      onClick={onClick}
      className={`border px-3 py-2 rounded cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}

export function SelectValue({ placeholder }) {
  return <span>{placeholder}</span>;
}

export function SelectContent({ children, className = "" }) {
  return (
    <div
      className={`absolute mt-2 z-50 rounded border shadow p-2 bg-white dark:bg-black ${className}`}
      style={{ minWidth: "7rem" }}
    >
      {children}
    </div>
  );
}

export function SelectItem({ value, onSelect, children }) {
  return (
    <div
      className="p-2 hover:bg-purple-100 dark:hover:bg-purple-900 cursor-pointer"
      onClick={() => onSelect(value)}
    >
      {children}
    </div>
  );
}
