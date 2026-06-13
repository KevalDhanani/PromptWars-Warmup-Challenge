import { MealPreferences } from '../types';

export function buildPrompt(p: MealPreferences): string {
  const perPersonBudget = (p.budget / p.servings).toFixed(2);

  return `
You are an expert meal planner. Generate a complete daily meal plan and return ONLY valid JSON — no markdown, no prose, no code fences.

CONSTRAINTS:
- Total daily food budget: $${p.budget} for ${p.servings} person(s) ($${perPersonBudget} per person)
- Max cooking time per meal: ${p.timeAvailable} minutes
- Dietary restrictions: ${p.restrictions.length ? p.restrictions.join(', ') : 'None'}
- Cuisine preference: ${p.cuisine || 'Any'}
- Servings per meal: ${p.servings}

STRICT RULES:
1. All three meals MUST fit within the $${p.budget} total budget
2. Respect ALL dietary restrictions without exception
3. Prep times must be realistic and under ${p.timeAvailable} minutes
4. Each ingredient must include 2–3 realistic substitutes
5. Grocery quantities must match the number of servings

Return this exact JSON structure:
{
  "breakfast": {
    "name": "string",
    "description": "string (1–2 sentences)",
    "ingredients": [
      { "name": "string", "quantity": number, "unit": "string", "substitutes": ["string", "string"] }
    ],
    "prepTime": number,
    "cost": number,
    "calories": number
  },
  "lunch": { /* same as breakfast */ },
  "dinner": { /* same as breakfast */ },
  "groceryList": [
    {
      "name": "string",
      "quantity": number,
      "unit": "string",
      "category": "Produce|Dairy & Eggs|Meat & Seafood|Pantry|Frozen|Bakery|Beverages|Other",
      "estimatedCost": number,
      "substitutes": ["string", "string"]
    }
  ],
  "totalCost": number,
  "withinBudget": boolean,
  "budgetDifference": number,
  "notes": "string (2–3 sentences on budget feasibility and any tips)"
}
`.trim();
}
