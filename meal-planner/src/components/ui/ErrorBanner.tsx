import { AlertCircle } from 'lucide-react';

interface ErrorBannerProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorBanner({ message, onRetry }: ErrorBannerProps) {
  return (
    <div className="bg-[#FCEBEB] border border-[#A32D2D]/20 text-[#A32D2D] p-4 rounded-lg flex items-start gap-3">
      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
      <div className="flex-1">
        <h4 className="font-medium mb-1">Something went wrong</h4>
        <p className="text-sm opacity-90 mb-3">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="text-sm font-medium hover:underline"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
