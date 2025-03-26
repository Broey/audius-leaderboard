export function Switch({ checked, onCheckedChange }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
      />
      <div className="w-11 h-6 bg-gray-300 peer-checked:bg-purple-600 rounded-full transition-colors"></div>
      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5" />
    </label>
  );
}
