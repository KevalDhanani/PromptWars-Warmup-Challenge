import { useState, useEffect, useCallback } from 'react';
import { HistoryEntry } from '../types';
import { getHistory, saveToHistory, deleteFromHistory, clearHistory as clearStorageHistory } from '../services/storageService';

export function useHistory() {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    setEntries(getHistory());
  }, []);

  const save = useCallback((entry: HistoryEntry) => {
    saveToHistory(entry);
    setEntries(getHistory());
  }, []);

  const remove = useCallback((id: string) => {
    deleteFromHistory(id);
    setEntries(getHistory());
  }, []);

  const clear = useCallback(() => {
    clearStorageHistory();
    setEntries([]);
  }, []);

  return { entries, save, remove, clear };
}
