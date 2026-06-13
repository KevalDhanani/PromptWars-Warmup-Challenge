import { formatCalories } from '../../utils/formatters';

interface NutritionBadgeProps {
  calories: number;
}

export function NutritionBadge({ calories }: NutritionBadgeProps) {
  return (
    <span className="px-2 py-1 bg-cream-100 text-gray-500 rounded-full text-[10px] font-semibold uppercase tracking-wider">
      {formatCalories(calories)}
    </span>
  );
}
