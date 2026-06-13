import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center text-gray-500 h-full border-2 border-dashed border-gray-200 rounded-xl">
      <Icon className="w-12 h-12 mb-4 text-gray-300" />
      <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
      <p className="max-w-xs">{description}</p>
    </div>
  );
}
