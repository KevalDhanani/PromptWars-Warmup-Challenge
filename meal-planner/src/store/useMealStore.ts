import { create } from 'zustand';
import { AppState, MealPlan, MealPreferences, GenerationStatus } from '../types';

const DEFAULT_PREFS: MealPreferences = {
  budget: 15,
  timeAvailable: 30,
  servings: 2,
  restrictions: [],
  cuisine: 'Any',
};

interface MealStore extends AppState {
  setPreferences: (p: Partial<MealPreferences>) => void;
  setPlan: (plan: MealPlan | null) => void;
  setStatus: (s: GenerationStatus) => void;
  setError: (e: string | null) => void;
  appendStreamingText: (t: string) => void;
  clearStreamingText: () => void;
  toggleItem: (name: string) => void;
  setHistoryOpen: (open: boolean) => void;
  reset: () => void;
}

export const useMealStore = create<MealStore>((set) => ({
  preferences: DEFAULT_PREFS,
  currentPlan: null,
  status: 'idle',
  error: null,
  streamingText: '',
  checkedItems: new Set(),
  historyOpen: false,

  setPreferences: (p) =>
    set((s) => ({ preferences: { ...s.preferences, ...p } })),

  setPlan: (plan) => set({ currentPlan: plan }),

  setStatus: (status) => set({ status }),

  setError: (error) => set({ error }),

  appendStreamingText: (t) =>
    set((s) => ({ streamingText: s.streamingText + t })),

  clearStreamingText: () => set({ streamingText: '' }),

  toggleItem: (name) =>
    set((s) => {
      const next = new Set(s.checkedItems);
      next.has(name) ? next.delete(name) : next.add(name);
      return { checkedItems: next };
    }),

  setHistoryOpen: (open) => set({ historyOpen: open }),

  reset: () =>
    set({ currentPlan: null, status: 'idle', error: null, streamingText: '' }),
}));
