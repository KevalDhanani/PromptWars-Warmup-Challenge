import { MealPlan } from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface BudgetBreakdownProps {
  plan: MealPlan;
  budget: number;
}

export function BudgetBreakdown({ plan, budget }: BudgetBreakdownProps) {
  const getWidth = (cost: number) => `${Math.min(100, (cost / budget) * 100)}%`;
  
  const getBarColor = (cost: number) => {
    const ratio = cost / budget;
    if (ratio > 0.5) return 'bg-red-500';
    if (ratio > 0.4) return 'bg-amber-500';
    return 'bg-green-500';
  };

  const meals = [
    { name: 'Breakfast', cost: plan.breakfast.cost },
    { name: 'Lunch', cost: plan.lunch.cost },
    { name: 'Dinner', cost: plan.dinner.cost },
  ];

  return (
    <div className="card h-full flex flex-col">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Budget summary</h3>

      <div className="space-y-4 mb-8">
        {meals.map((meal) => (
          <div key={meal.name}>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="font-medium text-gray-700">{meal.name}</span>
              <span className="text-gray-500">{formatCurrency(meal.cost)}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getBarColor(meal.cost)} transition-all duration-500`}
                style={{ width: getWidth(meal.cost) }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-gray-100 mb-6">
        <div className="flex justify-between items-end">
          <span className="text-sm font-semibold text-gray-900">Total Estimate</span>
          <div className="text-right">
            <span className={`text-2xl font-bold ${plan.withinBudget ? 'text-green-700' : 'text-red-600'}`}>
              {formatCurrency(plan.totalCost)}
            </span>
            <span className="block text-xs text-gray-500 font-medium">
              of {formatCurrency(budget)} budget
            </span>
          </div>
        </div>
      </div>

      <div className={`p-4 rounded-lg border flex-1 flex flex-col justify-center ${
        plan.withinBudget 
          ? 'bg-green-50 border-green-100 text-green-800' 
          : 'bg-amber-50 border-amber-100 text-amber-800'
      }`}>
        <p className="text-sm font-semibold mb-1">
          {plan.withinBudget ? '✨ Under budget!' : '⚠️ Over budget'}
        </p>
        <p className="text-xs opacity-90 leading-relaxed">
          {plan.notes}
        </p>
      </div>
    </div>
  );
}
