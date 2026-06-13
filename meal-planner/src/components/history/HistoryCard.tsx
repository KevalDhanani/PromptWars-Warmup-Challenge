import { HistoryEntry } from '../../types';
import { formatDate, formatCurrency } from '../../utils/formatters';
import { Trash2, RotateCcw } from 'lucide-react';

interface HistoryCardProps {
  entry: HistoryEntry;
  onRestore: () => void;
  onDelete: () => void;
}

export function HistoryCard({ entry, onRestore, onDelete }: HistoryCardProps) {
  const mealNames = [entry.plan.breakfast.name, entry.plan.lunch.name, entry.plan.dinner.name]
    .filter(Boolean)
    .join(' / ');

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm font-semibold text-gray-900">
          {formatDate(entry.savedAt)}
        </span>
        <span className="text-sm font-semibold text-amber-600">
          {formatCurrency(entry.plan.totalCost)}
        </span>
      </div>
      
      {entry.preferences.restrictions.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {entry.preferences.restrictions.map(r => (
            <span key={r} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-sm">
              {r}
            </span>
          ))}
        </div>
      )}
      
      <p className="text-xs text-gray-500 mb-4 line-clamp-2" title={mealNames}>
        {mealNames}
      </p>
      
      <div className="flex items-center gap-2">
        <button
          onClick={onRestore}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-green-50 text-green-700 text-xs font-medium rounded-md hover:bg-green-100 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Restore Plan
        </button>
        <button
          onClick={onDelete}
          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
