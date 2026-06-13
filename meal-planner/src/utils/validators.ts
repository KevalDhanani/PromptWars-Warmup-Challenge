import { MealPreferences } from '../types';

export function validatePreferences(prefs: MealPreferences): string | null {
  if (prefs.budget < 5) return 'Budget must be at least $5';
  if (prefs.budget > 200) return 'Budget must be $200 or less';
  if (prefs.servings < 1 || prefs.servings > 8) return 'Servings must be between 1 and 8';
  if (prefs.timeAvailable < 15 || prefs.timeAvailable > 120) return 'Time available must be between 15 and 120 minutes';
  return null;
}

export function validateApiKey(key: string): boolean {
  if (!key) return false;
  if (key.length < 20) return false;
  return true;
}
