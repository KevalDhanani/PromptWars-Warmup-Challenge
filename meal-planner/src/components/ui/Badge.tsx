import clsx from 'clsx';

interface BadgeProps {
  label: string;
  variant: 'green' | 'amber' | 'gray' | 'red';
  className?: string;
}

export function Badge({ label, variant, className }: BadgeProps) {
  const variants = {
    green: 'bg-green-100 text-green-700',
    amber: 'bg-amber-100 text-amber-700',
    gray: 'bg-gray-100 text-gray-600',
    red: 'bg-red-100 text-red-700',
  };

  return (
    <span
      className={clsx(
        'px-2 py-0.5 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {label}
    </span>
  );
}
