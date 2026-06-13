import { Modal } from '../ui/Modal';
import { Copy } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface SubstitutesPanelProps {
  ingredient: string;
  substitutes: string[];
  isOpen: boolean;
  onClose: () => void;
}

export function SubstitutesPanel({ ingredient, substitutes, isOpen, onClose }: SubstitutesPanelProps) {
  const handleCopy = (sub: string) => {
    navigator.clipboard.writeText(sub);
    toast.success('Copied to clipboard!');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Alternatives for ${ingredient}`}>
      {substitutes && substitutes.length > 0 ? (
        <div className="space-y-3">
          {substitutes.map((sub, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
              <span className="text-sm font-medium text-gray-800">{sub}</span>
              <button
                onClick={() => handleCopy(sub)}
                className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-white rounded transition-colors shadow-sm"
                title="Copy"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 text-center py-4">No substitutes found.</p>
      )}
    </Modal>
  );
}
