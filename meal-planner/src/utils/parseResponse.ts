import { MealPlan } from '../types';

export function parseResponse(raw: string, budget: number): MealPlan {
  // Strip any markdown fences Gemini might still add
  let cleaned = raw
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();

  // Extract the first valid JSON object
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('No valid JSON found in AI response');
  }

  let parsed: MealPlan;
  try {
    parsed = JSON.parse(jsonMatch[0]);
  } catch {
    throw new Error('Failed to parse meal plan JSON. Try generating again.');
  }

  // Validate required fields
  const required = ['breakfast', 'lunch', 'dinner', 'groceryList', 'totalCost'];
  for (const field of required) {
    if (!(field in parsed)) {
      throw new Error(`AI response missing required field: ${field}`);
    }
  }

  // Attach generation timestamp
  parsed.generatedAt = new Date().toISOString();

  // Recalculate budget fields from actual values
  parsed.budgetDifference = parseFloat((budget - parsed.totalCost).toFixed(2));
  parsed.withinBudget = parsed.totalCost <= budget;

  return parsed;
}
