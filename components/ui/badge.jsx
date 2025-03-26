// components/ui/badge.jsx
export function Badge({ children, variant = "default" }) {
  return (
    <span className="inline-flex items-center rounded-full bg-purple-600/10 text-purple-400 border border-purple-400/20 px-2 py-0.5 text-sm">
      {children}
    </span>
  );
}
