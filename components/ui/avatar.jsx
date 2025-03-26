export function Avatar({ children }) {
  return (
    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold">
      {children}
    </div>
  );
}

export function AvatarFallback({ children }) {
  return <>{children}</>;
}
