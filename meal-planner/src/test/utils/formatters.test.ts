import { describe, it, expect } from 'vitest';
import { formatCurrency, formatTime, formatCalories, formatDate } from '../../utils/formatters';

describe('formatCurrency', () => {
  it('formats whole dollars', () => expect(formatCurrency(5)).toBe('$5.00'));
  it('formats cents',        () => expect(formatCurrency(2.5)).toBe('$2.50'));
  it('handles zero',         () => expect(formatCurrency(0)).toBe('$0.00'));
  it('handles large values', () => expect(formatCurrency(100)).toBe('$100.00'));
});

describe('formatTime', () => {
  it('returns minutes under 60',  () => expect(formatTime(30)).toBe('30 min'));
  it('returns "1 hr" for 60',     () => expect(formatTime(60)).toBe('1 hr'));
  it('returns "1 hr 15 min"',     () => expect(formatTime(75)).toBe('1 hr 15 min'));
  it('returns "15 min" for 15',   () => expect(formatTime(15)).toBe('15 min'));
});

describe('formatCalories', () => {
  it('formats calories with approx', () => expect(formatCalories(350)).toBe('~350 kcal'));
  it('handles zero',                 () => expect(formatCalories(0)).toBe('~0 kcal'));
});

describe('formatDate', () => {
  it('returns "Today" for today',      () => {
    expect(formatDate(new Date().toISOString())).toBe('Today');
  });
  it('returns "Yesterday" for yesterday', () => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    expect(formatDate(d.toISOString())).toBe('Yesterday');
  });
  it('returns formatted date for older', () => {
    expect(formatDate('2024-01-15T10:00:00.000Z')).toMatch(/Jan/);
  });
});
