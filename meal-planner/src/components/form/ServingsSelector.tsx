import { Minus, Plus } from 'lucide-react';

interface ServingsSelectorProps {
  value: number;
  onChange: (v: number) => void;
}

export function ServingsSelector({ value, onChange }: ServingsSelectorProps) {
  const handleDec = () => value > 1 && onChange(value - 1);
  const handleInc = () => value < 8 && onChange(value + 1);

  return (
    <div className="mb-6 flex items-center justify-between">
      <label className="section-label mb-0" htmlFor="servings-input">Cooking for</label>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleDec}
          disabled={value <= 1}
          className="p-1 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 transition-colors"
          aria-label="Decrease servings"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span id="servings-input" className="w-4 text-center font-semibold text-gray-700">
          {value}
        </span>
        <button
          type="button"
          onClick={handleInc}
          disabled={value >= 8}
          className="p-1 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 transition-colors"
          aria-label="Increase servings"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
