import { describe, it, expect } from 'vitest';
import { parseResponse } from '../../utils/parseResponse';

const VALID_JSON = JSON.stringify({
  breakfast:  { name: 'Oats', description: 'Porridge', ingredients: [], prepTime: 10, cost: 1.5, calories: 300 },
  lunch:      { name: 'Wrap', description: 'Chicken wrap', ingredients: [], prepTime: 15, cost: 4.0, calories: 500 },
  dinner:     { name: 'Pasta', description: 'Tomato pasta', ingredients: [], prepTime: 25, cost: 5.5, calories: 650 },
  groceryList: [],
  totalCost:  11.0,
  withinBudget: true,
  budgetDifference: 4.0,
  notes:      'Fits well within budget.',
});

describe('parseResponse', () => {
  it('parses clean JSON',                   () => {
    const plan = parseResponse(VALID_JSON, 15);
    expect(plan.breakfast.name).toBe('Oats');
  });

  it('strips markdown code fences',         () => {
    const plan = parseResponse('```json\n' + VALID_JSON + '\n```', 15);
    expect(plan.lunch.name).toBe('Wrap');
  });

  it('attaches generatedAt timestamp',      () => {
    const plan = parseResponse(VALID_JSON, 15);
    expect(plan.generatedAt).toBeTruthy();
    expect(new Date(plan.generatedAt).getFullYear()).toBeGreaterThan(2023);
  });

  it('recalculates withinBudget correctly', () => {
    const plan = parseResponse(VALID_JSON, 10); // budget 10 < cost 11
    expect(plan.withinBudget).toBe(false);
    expect(plan.budgetDifference).toBeLessThan(0);
  });

  it('throws on empty string',              () => {
    expect(() => parseResponse('', 15)).toThrow();
  });

  it('throws on plain text (no JSON)',      () => {
    expect(() => parseResponse('Sorry, I cannot help with that.', 15)).toThrow();
  });

  it('throws if required fields missing',   () => {
    const bad = JSON.stringify({ breakfast: { name: 'X' } });
    expect(() => parseResponse(bad, 15)).toThrow(/missing/i);
  });
});
