import { useState } from 'react';
import { GroceryItem as IGroceryItem } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { ChevronDown, ChevronUp } from 'lucide-react';
import clsx from 'clsx';

interface GroceryItemProps {
  item: IGroceryItem;
  checked: boolean;
  onToggle: () => void;
}

export function GroceryItem({ item, checked, onToggle }: GroceryItemProps) {
  const [expanded, setExpanded] = useState(false);
  const hasSubs = item.substitutes && item.substitutes.length > 0;

  return (
    <div className={clsx(
      "group p-3 rounded-lg border transition-all",
      checked ? "bg-gray-50 border-gray-100 item-checked" : "bg-white border-gray-200 hover:border-green-300"
    )}>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={onToggle}
          className="mt-1"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-4">
            <span className="item-label font-medium text-gray-900 leading-snug">
              {item.name}
              <span className="text-gray-500 font-normal ml-2 text-sm">
                ({item.quantity} {item.unit})
              </span>
            </span>
            <span className="text-sm font-medium text-amber-600 shrink-0">
              {formatCurrency(item.estimatedCost)}
            </span>
          </div>
          
          {hasSubs && !checked && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-1 text-xs text-gray-400 hover:text-green-600 flex items-center gap-1 transition-colors"
            >
              {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              {expanded ? 'Hide substitutes' : 'View substitutes'}
            </button>
          )}

          {expanded && hasSubs && !checked && (
            <p className="mt-2 text-xs text-gray-500 italic">
              Or: {item.substitutes.join(', ')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
