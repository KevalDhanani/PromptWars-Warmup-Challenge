import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MealForm } from '../../components/form/MealForm';

describe('MealForm', () => {
  it('renders budget slider',                    () => {
    render(<MealForm />);
    expect(screen.getByLabelText(/daily budget/i)).toBeInTheDocument();
  });

  it('renders time slider',                      () => {
    render(<MealForm />);
    expect(screen.getByLabelText(/time per meal/i)).toBeInTheDocument();
  });

  it('renders servings stepper',                 () => {
    render(<MealForm />);
    expect(screen.getByLabelText(/cooking for/i)).toBeInTheDocument();
  });

  it('renders diet chips',                       () => {
    render(<MealForm />);
    expect(screen.getByText('Vegan')).toBeInTheDocument();
    expect(screen.getByText('Keto')).toBeInTheDocument();
  });

  it('toggles diet chip selection',              () => {
    render(<MealForm />);
    const veganChip = screen.getByText('Vegan');
    fireEvent.click(veganChip);
    expect(veganChip.closest('[data-selected]')).toHaveAttribute('data-selected', 'true');
  });
});
