import { HistoryEntry, MealPreferences } from '../types';

const HISTORY_KEY = 'mealplanner_history';
const PREFS_KEY   = 'mealplanner_prefs';
const MAX_HISTORY = 30;

export function saveToHistory(entry: HistoryEntry): void {
  const all = getHistory();
  const updated = [entry, ...all].slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
}

export function getHistory(): HistoryEntry[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch {
    return [];
  }
}

export function deleteFromHistory(id: string): void {
  const filtered = getHistory().filter(e => e.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered));
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}

export function savePreferences(prefs: MealPreferences): void {
  localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
}

export function getPreferences(): MealPreferences | null {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
