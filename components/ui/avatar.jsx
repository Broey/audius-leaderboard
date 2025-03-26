export function Avatar({ children }) {
  return (
    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
      {children}
    </div>
  );
}

export function AvatarFallback({ children }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-500 text-white">
      {children}
    </div>
  );
}
