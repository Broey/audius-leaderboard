import { useState } from "react";

export function Select({ value, onValueChange, children }) {
  return <div>{children}</div>;
}

export function SelectTrigger({ children, className }) {
  return <button className={className}>{children}</button>;
}

export function SelectValue({ placeholder }) {
  return <span>{placeholder}</span>;
}

export function SelectContent({ children, className }) {
  return <div className={className}>{children}</div>;
}

export function SelectItem({ value, children }) {
  return <div>{children}</div>;
}
