import { Clock } from 'lucide-react';
import { formatTime } from '../../utils/formatters';

interface TimeSliderProps {
  value: number;
  onChange: (v: number) => void;
}

export function TimeSlider({ value, onChange }: TimeSliderProps) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="section-label mb-0 flex items-center gap-1.5" htmlFor="time-slider">
          <Clock className="w-3.5 h-3.5" />
          Time per meal
        </label>
        <span className="text-sm font-semibold text-gray-700">{formatTime(value)}</span>
      </div>
      <input
        id="time-slider"
        type="range"
        min={15}
        max={90}
        step={15}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        list="time-markers"
      />
      <div className="flex justify-between text-xs text-gray-400 mt-1 px-1">
        <span>Quick</span>
        <span>Normal</span>
        <span>Weekend cook</span>
      </div>
    </div>
  );
}
