import clsx from 'clsx';

interface ChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export function Chip({ label, selected, onClick }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'chip',
        selected ? 'chip-selected' : 'chip-unselected'
      )}
      data-selected={selected}
    >
      {label}
    </button>
  );
}
