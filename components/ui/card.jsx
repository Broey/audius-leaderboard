// components/ui/card.jsx
export function Card({ children, className }) {
  return (
    <div className={`rounded-xl border bg-card text-card-foreground shadow ${className}`}>
      {children}
    </div>
  );
}
