import { cn } from '@/utils/style';
import { type VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, ReactNode, RefObject } from 'react';
import { SpinnerIcon } from '../icons';
import { buttonVariants, iconVariants } from './style';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    ref?: RefObject<HTMLButtonElement | null>;
    disabled?: boolean;
    isLoading?: boolean;
    icon?: ReactNode;
  };

export function Button({
  ref,
  variant,
  size,
  className,
  disabled,
  isLoading,
  icon,
  children,
  name,
  ...props
}: ButtonProps) {
  return (
    <button
      ref={ref}
      className={cn(
        buttonVariants({ variant, size, isLoading, disabled }),
        className,
      )}
      disabled={disabled || isLoading}
      aria-label={isLoading ? `${name} 버튼 로딩 중` : undefined}
      name={name}
      {...props}
    >
      {isLoading && (
        <SpinnerIcon
          width={24}
          height={24}
          fill="var(--color-dark-grey)"
          className="animate-spin"
        />
      )}
      {!isLoading && icon && (
        <div className={cn(iconVariants({ size }))}>{icon}</div>
      )}
      {!isLoading && children}
    </button>
  );
}
