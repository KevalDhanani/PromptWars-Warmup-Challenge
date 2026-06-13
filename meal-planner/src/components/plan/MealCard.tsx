import { useState } from 'react';
import { Meal } from '../../types';
import { ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';
import { NutritionBadge } from './NutritionBadge';
import { SubstitutesPanel } from './SubstitutesPanel';
import { formatTime, formatCurrency } from '../../utils/formatters';

interface MealCardProps {
  meal: Meal;
  mealType: 'breakfast' | 'lunch' | 'dinner';
}

const TYPE_ICONS = {
  breakfast: '🌅',
  lunch: '☀️',
  dinner: '🌙',
};

export function MealCard({ meal, mealType }: MealCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [substituteIng, setSubstituteIng] = useState<{name: string, subs: string[]} | null>(null);

  const displayIngs = expanded ? meal.ingredients : meal.ingredients.slice(0, 3);
  const hasMore = meal.ingredients.length > 3;

  return (
    <div className="card flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl" aria-hidden="true">{TYPE_ICONS[mealType]}</span>
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
            {mealType}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <NutritionBadge calories={meal.calories} />
        </div>
      </div>

      <h3 className="meal-name mb-2">{meal.name}</h3>
      <p className="text-sm text-gray-500 mb-6 flex-1">{meal.description}</p>

      <div className="flex items-center justify-between text-sm font-medium mb-6 pt-4 border-t border-gray-100">
        <span className="text-gray-600">{formatTime(meal.prepTime)}</span>
        <span className="text-amber-600">{formatCurrency(meal.cost)}</span>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 -mx-2 -mb-2">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Ingredients</h4>
        </div>
        
        <ul className="space-y-3">
          {displayIngs.map((ing, i) => (
            <li key={i} className="group flex items-start justify-between gap-2 text-sm">
              <span className="text-gray-700">
                <span className="font-medium">{ing.quantity} {ing.unit}</span> {ing.name}
              </span>
              {ing.substitutes?.length > 0 && (
                <button
                  onClick={() => setSubstituteIng({ name: ing.name, subs: ing.substitutes })}
                  className="opacity-0 group-hover:opacity-100 flex items-center gap-1 text-xs text-green-600 hover:text-green-700 transition-opacity"
                  title="Find substitute"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span className="sr-only">Substitutes for {ing.name}</span>
                </button>
              )}
            </li>
          ))}
        </ul>

        {hasMore && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full mt-4 py-2 flex items-center justify-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-200/50 rounded transition-colors"
          >
            {expanded ? (
              <><ChevronUp className="w-3.5 h-3.5" /> Show less</>
            ) : (
              <><ChevronDown className="w-3.5 h-3.5" /> +{meal.ingredients.length - 3} more</>
            )}
          </button>
        )}
      </div>

      <SubstitutesPanel 
        ingredient={substituteIng?.name || ''} 
        substitutes={substituteIng?.subs || []} 
        isOpen={!!substituteIng}
        onClose={() => setSubstituteIng(null)} 
      />
    </div>
  );
}
