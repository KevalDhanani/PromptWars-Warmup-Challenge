import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MealCard } from '../../components/plan/MealCard';
import type { Meal } from '../../types';

const mockMeal: Meal = {
  name: 'Avocado Toast',
  description: 'Toasted sourdough with avocado',
  ingredients: [
    { name: 'Sourdough bread', quantity: 2, unit: 'slices', substitutes: ['rye bread'] },
    { name: 'Avocado', quantity: 1, unit: 'whole', substitutes: ['hummus'] },
  ],
  prepTime: 10,
  cost: 3.50,
  calories: 380,
};

describe('MealCard', () => {
  it('renders meal name',               () => {
    render(<MealCard meal={mockMeal} mealType="breakfast" />);
    expect(screen.getByText('Avocado Toast')).toBeInTheDocument();
  });

  it('renders meal description',        () => {
    render(<MealCard meal={mockMeal} mealType="breakfast" />);
    expect(screen.getByText(/Toasted sourdough/)).toBeInTheDocument();
  });

  it('renders prep time',               () => {
    render(<MealCard meal={mockMeal} mealType="breakfast" />);
    expect(screen.getByText(/10 min/)).toBeInTheDocument();
  });

  it('renders cost in amber display',   () => {
    render(<MealCard meal={mockMeal} mealType="breakfast" />);
    expect(screen.getByText(/3\.50/)).toBeInTheDocument();
  });

  it('renders calorie badge',           () => {
    render(<MealCard meal={mockMeal} mealType="breakfast" />);
    expect(screen.getByText(/380/)).toBeInTheDocument();
  });

  it('shows ingredients on expand',     () => {
    render(<MealCard meal={mockMeal} mealType="breakfast" />);
    fireEvent.click(screen.getByRole('button', { name: /ingredients/i }));
    expect(screen.getByText(/Avocado/)).toBeInTheDocument();
  });

  it('renders breakfast emoji/label',   () => {
    render(<MealCard meal={mockMeal} mealType="breakfast" />);
    expect(screen.getByText(/breakfast/i)).toBeInTheDocument();
  });
});
