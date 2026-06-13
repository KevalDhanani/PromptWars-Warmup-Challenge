import { ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 min-h-[calc(100vh-64px)]">
      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 lg:gap-8 items-start">
        {children}
      </div>
    </div>
  );
}
