import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BudgetBreakdown } from '../../components/plan/BudgetBreakdown';
import type { MealPlan } from '../../types';

const makePlan = (totalCost: number, withinBudget: boolean, diff: number): MealPlan => ({
  breakfast:  { name: 'A', description: '', ingredients: [], prepTime: 10, cost: 2, calories: 300 },
  lunch:      { name: 'B', description: '', ingredients: [], prepTime: 20, cost: 4, calories: 500 },
  dinner:     { name: 'C', description: '', ingredients: [], prepTime: 30, cost: totalCost - 6, calories: 600 },
  groceryList: [],
  totalCost,
  withinBudget,
  budgetDifference: diff,
  notes: 'Great budget balance.',
  generatedAt: '',
});

describe('BudgetBreakdown', () => {
  it('shows total cost',                          () => {
    render(<BudgetBreakdown plan={makePlan(11, true, 4)} budget={15} />);
    expect(screen.getByText(/11/)).toBeInTheDocument();
  });

  it('shows within-budget success message',       () => {
    render(<BudgetBreakdown plan={makePlan(11, true, 4)} budget={15} />);
    expect(screen.getByText(/under budget/i)).toBeInTheDocument();
  });

  it('shows over-budget warning',                 () => {
    render(<BudgetBreakdown plan={makePlan(18, false, -3)} budget={15} />);
    expect(screen.getByText(/over budget/i)).toBeInTheDocument();
  });

  it('renders AI notes',                          () => {
    render(<BudgetBreakdown plan={makePlan(11, true, 4)} budget={15} />);
    expect(screen.getByText(/Great budget balance/)).toBeInTheDocument();
  });

  it('renders three budget bars',                 () => {
    render(<BudgetBreakdown plan={makePlan(11, true, 4)} budget={15} />);
    expect(screen.getAllByRole('progressbar')).toHaveLength(3);
  });
});
