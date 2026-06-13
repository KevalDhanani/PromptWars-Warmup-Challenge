import { useMealStore } from '../../store/useMealStore';
import { MealCard } from './MealCard';
import { GroceryList } from './GroceryList';
import { BudgetBreakdown } from './BudgetBreakdown';

export function MealPlanDisplay() {
  const { currentPlan, preferences } = useMealStore();

  if (!currentPlan) return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MealCard meal={currentPlan.breakfast} mealType="breakfast" />
        <MealCard meal={currentPlan.lunch} mealType="lunch" />
        <MealCard meal={currentPlan.dinner} mealType="dinner" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <GroceryList items={currentPlan.groceryList} />
        <BudgetBreakdown plan={currentPlan} budget={preferences.budget} />
      </div>
    </div>
  );
}
