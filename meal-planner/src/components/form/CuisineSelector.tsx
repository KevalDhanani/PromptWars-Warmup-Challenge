import { CUISINE_OPTIONS } from '../../constants';

interface CuisineSelectorProps {
  value: string;
  onChange: (v: string) => void;
}

export function CuisineSelector({ value, onChange }: CuisineSelectorProps) {
  return (
    <div className="mb-8">
      <label className="section-label block" htmlFor="cuisine-select">Cuisine preference (optional)</label>
      <select
        id="cuisine-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-cream-100 border-none rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:ring-2 focus:ring-green-600 outline-none"
      >
        {CUISINE_OPTIONS.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
