import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem:    (k: string) => store[k] ?? null,
    setItem:    (k: string, v: string) => { store[k] = v; },
    removeItem: (k: string) => { delete store[k]; },
    clear:      () => { store = {}; },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock Gemini SDK — prevent real API calls in tests
vi.mock('../services/gemini', () => ({
  getModel: () => ({
    generateContent: vi.fn(),
    generateContentStream: vi.fn(),
  }),
  isKeyValid: vi.fn(() => true),
}));
