import { Spinner } from '../ui/Spinner';

interface GenerateButtonProps {
  loading: boolean;
  disabled: boolean;
}

export function GenerateButton({ loading, disabled }: GenerateButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled || loading}
      className="btn-primary w-full flex items-center justify-center gap-2"
    >
      {loading ? (
        <>
          <Spinner size="sm" className="text-white/80" />
          <span>Planning your meals…</span>
        </>
      ) : (
        <span>Generate Meal Plan</span>
      )}
    </button>
  );
}
