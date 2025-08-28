import * as React from 'react';

import { cn } from '@/utils/classNames';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const enforceMinMax = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;
      const value = parseInt(target.value);
      const min = parseInt(target.min);
      const max = parseInt(target.max);

      if (!isNaN(value)) {
        if (value < min) {
          target.value = min.toString();
        }
        if (value > max) {
          target.value = max.toString();
        }
      }
    };

    return (
      <input
        className={cn(
          'flex h-10 w-full rounded-md bg-input-bg px-5 py-2 text-xs transition duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-input-placeholder focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        type={type}
        onKeyUp={enforceMinMax}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';
