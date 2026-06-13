import { Clock } from 'lucide-react';
import { useMealStore } from '../../store/useMealStore';
import { isKeyValid } from '../../services/gemini';

export function Header() {
  const { setHistoryOpen } = useMealStore();
  const validKey = isKeyValid();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAFAF7]/80 backdrop-blur-md border-b border-[#E4E2DA]">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-gray-900 tracking-wide">Mise en place</h1>
          <p className="text-xs text-gray-500 font-medium">Your AI kitchen planner</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500" title={validKey ? "API key valid" : "Missing API key"}>
            <span className={`w-2 h-2 rounded-full ${validKey ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="hidden sm:inline">API Status</span>
          </div>
          <button
            onClick={() => setHistoryOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
          >
            <Clock className="w-4 h-4" />
            <span className="hidden sm:inline">History</span>
          </button>
        </div>
      </div>
    </header>
  );
}
