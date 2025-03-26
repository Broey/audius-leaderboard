export function Switch({ checked, onCheckedChange }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onCheckedChange(e.target.checked)}
        className="sr-only"
      />
      <div className="w-11 h-6 bg-gray-300 rounded-full shadow-inner transition peer-checked:bg-purple-600"></div>
      <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
    </label>
  );
}
