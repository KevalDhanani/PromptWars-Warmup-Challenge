import { GroceryItem as IGroceryItem } from '../../types';
import { useMealStore } from '../../store/useMealStore';
import { GroceryItem } from './GroceryItem';
import { Copy, ShoppingBag } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface GroceryListProps {
  items: IGroceryItem[];
}

export function GroceryList({ items }: GroceryListProps) {
  const { checkedItems, toggleItem } = useMealStore();

  const handleCopy = () => {
    const text = items.map(i => `- [ ] ${i.quantity} ${i.unit} ${i.name}`).join('\n');
    navigator.clipboard.writeText(text);
    toast.success('List copied to clipboard!');
  };

  const grouped = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, IGroceryItem[]>);

  if (items.length === 0) {
    return (
      <div className="card h-full flex flex-col items-center justify-center p-12 text-center text-gray-500">
        <ShoppingBag className="w-12 h-12 mb-4 text-gray-300" />
        <p>Your grocery list will appear here.</p>
      </div>
    );
  }

  return (
    <div className="card h-full">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-green-600" />
          Grocery List
        </h3>
        <button
          onClick={handleCopy}
          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
          title="Copy list"
        >
          <Copy className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        {Object.entries(grouped).map(([category, catItems]) => (
          <div key={category}>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 ml-1">
              {category}
            </h4>
            <div className="space-y-2">
              {catItems.map((item, i) => (
                <GroceryItem
                  key={i}
                  item={item}
                  checked={checkedItems.has(item.name)}
                  onToggle={() => toggleItem(item.name)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
