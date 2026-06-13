export interface MealPreferences {
  budget: number;               // total daily budget in USD
  timeAvailable: number;        // minutes per meal (15–90)
  servings: number;             // number of people
  restrictions: string[];       // e.g. ['Vegan', 'Gluten-free']
  cuisine: string;              // e.g. 'Indian' or 'Any'
}

export interface Meal {
  name: string;
  description: string;
  ingredients: Ingredient[];
  prepTime: number;             // minutes
  cost: number;                 // USD estimate
  calories: number;             // approx kcal
}

export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;                 // 'cups', 'grams', 'tbsp', 'pieces'
  substitutes: string[];        // 2–3 alternatives
}

export interface GroceryItem {
  name: string;
  quantity: number;
  unit: string;
  category: GroceryCategory;
  estimatedCost: number;
  substitutes: string[];
}

export type GroceryCategory =
  | 'Produce'
  | 'Dairy & Eggs'
  | 'Meat & Seafood'
  | 'Pantry'
  | 'Frozen'
  | 'Bakery'
  | 'Beverages'
  | 'Other';

export interface MealPlan {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  groceryList: GroceryItem[];
  totalCost: number;
  withinBudget: boolean;
  budgetDifference: number;     // positive = under, negative = over
  notes: string;                // AI feasibility commentary
  generatedAt: string;          // ISO timestamp
}

export interface HistoryEntry {
  id: string;                   // uuid-style: timestamp + random
  plan: MealPlan;
  preferences: MealPreferences;
  savedAt: string;              // ISO timestamp
}

export type GenerationStatus =
  | 'idle'
  | 'streaming'
  | 'parsing'
  | 'done'
  | 'error';

export interface AppState {
  preferences: MealPreferences;
  currentPlan: MealPlan | null;
  status: GenerationStatus;
  error: string | null;
  streamingText: string;
  checkedItems: Set<string>;    // grocery item names that are checked
  historyOpen: boolean;
}
