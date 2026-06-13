import { useState, useEffect } from 'react';
import { Spinner } from './Spinner';

const MESSAGES = [
  'Planning breakfast…',
  'Building grocery list…',
  'Checking your budget…',
];

export function StreamingIndicator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % MESSAGES.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500 animate-pulse">
      <Spinner size="lg" className="text-green-600 mb-4" />
      <p className="text-lg font-medium text-gray-700">{MESSAGES[index]}</p>
    </div>
  );
}
