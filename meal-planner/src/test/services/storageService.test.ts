import { describe, it, expect, beforeEach } from 'vitest';
import {
  saveToHistory, getHistory, deleteFromHistory,
  clearHistory, savePreferences, getPreferences, generateId,
} from '../../services/storageService';
import type { HistoryEntry } from '../../types';

const mockEntry = (id = '1'): HistoryEntry => ({
  id,
  savedAt: new Date().toISOString(),
  preferences: { budget: 15, timeAvailable: 30, servings: 2, restrictions: [], cuisine: 'Any' },
  plan: {
    breakfast: { name: 'Oats', description: '', ingredients: [], prepTime: 10, cost: 1.5, calories: 300 },
    lunch:     { name: 'Wrap', description: '', ingredients: [], prepTime: 15, cost: 4.0, calories: 500 },
    dinner:    { name: 'Pasta', description: '', ingredients: [], prepTime: 25, cost: 5.5, calories: 650 },
    groceryList: [], totalCost: 11, withinBudget: true, budgetDifference: 4, notes: '', generatedAt: '',
  },
});

beforeEach(() => localStorage.clear());

describe('saveToHistory / getHistory', () => {
  it('saves and retrieves an entry',           () => {
    saveToHistory(mockEntry('a'));
    expect(getHistory()).toHaveLength(1);
    expect(getHistory()[0].id).toBe('a');
  });

  it('prepends newest entry first',             () => {
    saveToHistory(mockEntry('a'));
    saveToHistory(mockEntry('b'));
    expect(getHistory()[0].id).toBe('b');
  });

  it('caps history at 30 entries',              () => {
    for (let i = 0; i < 35; i++) saveToHistory(mockEntry(String(i)));
    expect(getHistory()).toHaveLength(30);
  });

  it('returns empty array when nothing saved',  () => expect(getHistory()).toEqual([]));
});

describe('deleteFromHistory', () => {
  it('removes the correct entry',               () => {
    saveToHistory(mockEntry('a'));
    saveToHistory(mockEntry('b'));
    deleteFromHistory('a');
    const h = getHistory();
    expect(h).toHaveLength(1);
    expect(h[0].id).toBe('b');
  });

  it('is a no-op when id does not exist',       () => {
    saveToHistory(mockEntry('a'));
    deleteFromHistory('z');
    expect(getHistory()).toHaveLength(1);
  });
});

describe('clearHistory', () => {
  it('removes all entries', () => {
    saveToHistory(mockEntry('a'));
    clearHistory();
    expect(getHistory()).toHaveLength(0);
  });
});

describe('savePreferences / getPreferences', () => {
  it('saves and retrieves preferences', () => {
    const prefs = { budget: 25, timeAvailable: 45, servings: 3, restrictions: ['Vegan'], cuisine: 'Indian' };
    savePreferences(prefs);
    expect(getPreferences()).toEqual(prefs);
  });

  it('returns null when nothing saved', () => expect(getPreferences()).toBeNull());
});

describe('generateId', () => {
  it('generates unique ids',     () => expect(generateId()).not.toBe(generateId()));
  it('returns a string',         () => expect(typeof generateId()).toBe('string'));
  it('id contains a dash',       () => expect(generateId()).toContain('-'));
});
