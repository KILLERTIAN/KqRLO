import * as React from 'react';

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
  'aria-label'?: string;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ checked, onCheckedChange, className = '', 'aria-label': ariaLabel, ...props }, ref) => {
    return (
      <label className={`inline-flex items-center cursor-pointer ${className}`}>
        <input
          type="checkbox"
          checked={checked}
          onChange={e => onCheckedChange(e.target.checked)}
          ref={ref}
          className="sr-only"
          aria-label={ariaLabel}
          {...props}
        />
        <span
          className={`w-10 h-6 flex items-center bg-gray-700 rounded-full p-1 duration-300 transition-colors ${checked ? 'bg-gradient-to-r from-purple-500 to-pink-500' : ''}`}
        >
          <span
            className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 transition-transform ${checked ? 'translate-x-4' : ''}`}
          />
        </span>
      </label>
    );
  }
);
Switch.displayName = 'Switch'; 