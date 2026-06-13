import { formatCurrency } from '../../utils/formatters';

interface BudgetSliderProps {
  value: number;
  onChange: (v: number) => void;
  servings: number;
}

export function BudgetSlider({ value, onChange, servings }: BudgetSliderProps) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-end mb-2">
        <label className="section-label mb-0" htmlFor="budget-slider">Daily budget</label>
        <div className="text-right">
          <span className="text-xl font-semibold text-green-700">{formatCurrency(value)}</span>
          {servings > 1 && (
            <span className="block text-xs text-gray-500">
              {formatCurrency(value / servings)}/person
            </span>
          )}
        </div>
      </div>
      <input
        id="budget-slider"
        type="range"
        min={5}
        max={60}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        list="budget-markers"
      />
      <datalist id="budget-markers" className="flex justify-between text-xs text-gray-400 mt-1 px-1">
        <option value="5" label="$5"></option>
        <option value="20" label="$20"></option>
        <option value="40" label="$40"></option>
        <option value="60" label="$60"></option>
      </datalist>
    </div>
  );
}
