export function Badge({ children, variant = "default" }) {
  const baseStyles = "inline-block px-2 py-0.5 rounded text-xs font-medium";
  const variants = {
    default: "bg-purple-600/10 text-purple-400 border border-purple-400/20",
  };
  return <span className={`${baseStyles} ${variants[variant]}`}>{children}</span>;
}
