'use client';

import { cn } from '@/utils/style';

type ToggleButtonProps = {
  isOn: boolean;
  onToggle: () => void;
};

export function ToggleButton({ isOn, onToggle }: ToggleButtonProps) {
  const handleToggle = () => {
    onToggle();
  };
  return (
    <button
      type="button"
      aria-pressed={isOn}
      onClick={handleToggle}
      className={cn(
        'w-12 h-7 rounded-full border-none outline-none transition-colors duration-200 relative p-0 inline-block shadow-sm cursor-pointer',
        isOn ? 'bg-blue' : 'bg-light-grey',
      )}
    >
      <span
        className={cn(
          'absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-lg transition-all duration-200',
          isOn && 'translate-x-5',
        )}
      />
    </button>
  );
}
