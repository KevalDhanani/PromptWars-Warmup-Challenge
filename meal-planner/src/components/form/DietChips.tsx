import { DIET_OPTIONS } from '../../constants';
import { Chip } from '../ui/Chip';

interface DietChipsProps {
  selected: string[];
  onChange: (selected: string[]) => void;
}

export function DietChips({ selected, onChange }: DietChipsProps) {
  const toggle = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(i => i !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="mb-6">
      <h4 className="section-label">Dietary Restrictions</h4>
      <div className="flex flex-wrap gap-2">
        {DIET_OPTIONS.map(option => (
          <Chip
            key={option}
            label={option}
            selected={selected.includes(option)}
            onClick={() => toggle(option)}
          />
        ))}
      </div>
    </div>
  );
}
