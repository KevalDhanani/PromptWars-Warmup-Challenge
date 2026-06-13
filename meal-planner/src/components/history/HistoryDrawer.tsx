import { X } from 'lucide-react';
import clsx from 'clsx';
import { useMealStore } from '../../store/useMealStore';
import { useHistory } from '../../hooks/useHistory';
import { HistoryCard } from './HistoryCard';
import { toast } from 'react-hot-toast';

export function HistoryDrawer() {
  const { historyOpen, setHistoryOpen, setPlan, setPreferences } = useMealStore();
  const { entries, remove, clear } = useHistory();

  if (!historyOpen) return null;

  const handleRestore = (entry: any) => {
    setPreferences(entry.preferences);
    setPlan(entry.plan);
    setHistoryOpen(false);
    toast.success('Past plan restored!');
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 md:hidden" 
        onClick={() => setHistoryOpen(false)} 
      />
      <div 
        className={clsx(
          "fixed top-0 right-0 h-full w-full md:w-[360px] bg-[#FAFAF7] shadow-2xl z-50 flex flex-col border-l border-gray-200",
          "animate-in slide-in-from-right duration-300"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <h2 className="text-lg font-semibold text-gray-900">Past plans</h2>
          <button
            onClick={() => setHistoryOpen(false)}
            className="p-1.5 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {entries.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No saved plans yet.</p>
              <p className="text-sm mt-1">Generated plans will appear here.</p>
            </div>
          ) : (
            entries.map(entry => (
              <HistoryCard
                key={entry.id}
                entry={entry}
                onRestore={() => handleRestore(entry)}
                onDelete={() => remove(entry.id)}
              />
            ))
          )}
        </div>

        {entries.length > 0 && (
          <div className="p-4 border-t border-gray-200 bg-white">
            <button
              onClick={clear}
              className="w-full py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Clear all history
            </button>
          </div>
        )}
      </div>
    </>
  );
}
