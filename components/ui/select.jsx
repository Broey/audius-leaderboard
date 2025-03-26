// components/ui/select.jsx
export function Select({ children, value, onValueChange }) {
  // Simply render children without treating them as a function
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
      onClick={() => {
        // For now, just show an alert; later you can wire this up to actually change the season.
        alert(`Set season to ${value}`);
      }}
    >
      {children}
    </div>
  );
}
