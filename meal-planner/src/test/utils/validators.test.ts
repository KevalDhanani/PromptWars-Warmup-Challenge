import { describe, it, expect } from 'vitest';
import { validatePreferences, validateApiKey } from '../../utils/validators';

describe('validatePreferences', () => {
  const valid = { budget: 15, timeAvailable: 30, servings: 2, restrictions: [], cuisine: 'Any' };

  it('accepts valid preferences',             () => expect(validatePreferences(valid)).toBeNull());
  it('rejects budget below 5',                () => expect(validatePreferences({ ...valid, budget: 4 })).toMatch(/budget/i));
  it('rejects budget above 200',              () => expect(validatePreferences({ ...valid, budget: 201 })).toMatch(/budget/i));
  it('rejects servings below 1',              () => expect(validatePreferences({ ...valid, servings: 0 })).toMatch(/servings/i));
  it('rejects servings above 8',              () => expect(validatePreferences({ ...valid, servings: 9 })).toMatch(/servings/i));
  it('rejects time below 15',                 () => expect(validatePreferences({ ...valid, timeAvailable: 10 })).toMatch(/time/i));
  it('rejects time above 90',                 () => expect(validatePreferences({ ...valid, timeAvailable: 120 })).toMatch(/time/i));
  it('accepts empty restrictions array',      () => expect(validatePreferences({ ...valid, restrictions: [] })).toBeNull());
  it('accepts multiple restrictions',         () => expect(validatePreferences({ ...valid, restrictions: ['Vegan', 'Keto'] })).toBeNull());
});

describe('validateApiKey', () => {
  it('accepts a valid long key',              () => expect(validateApiKey('AIzaSyAbcdef1234567890')).toBe(true));
  it('rejects empty string',                  () => expect(validateApiKey('')).toBe(false));
  it('rejects keys shorter than 20 chars',    () => expect(validateApiKey('short-key')).toBe(false));
});
