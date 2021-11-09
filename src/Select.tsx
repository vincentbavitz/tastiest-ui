import clsx from 'clsx';
import React, { FC } from 'react';
import './tailwind.css';

export type SelectOption = React.DetailedHTMLProps<
  React.OptionHTMLAttributes<HTMLOptionElement>,
  HTMLOptionElement
>;

export interface SelectProps {
  noDefault?: boolean;
  defaultSelected?: boolean;
  // The text shown with noDefault. Else it's an empty box
  promptText?: string;
  children: SelectOption | SelectOption[];
  onChange?: (value: string) => void;
  size?: 'small' | 'medium';

  label?: string;
  labelTheme?: 'primary' | 'normal';
}

export const Select: FC<SelectProps> = (props) => {
  const {
    children,
    noDefault,
    defaultSelected,
    promptText,
    size = 'medium',
    label,
    labelTheme,
  } = props;

  return (
    <label className="relative block w-full">
      {label && (
        <span
          className={clsx(
            'mb-1',
            size === 'small' ? 'text-sm' : 'text-base',
            labelTheme === 'primary'
              ? 'text-primary tracking-wide font-medium'
              : 'text-black'
          )}
        >
          {label}
        </span>
      )}
      <div
        // style={{ width: 'min-content' }}
        className="relative flex items-center"
      >
        <select
          className={clsx(
            'block w-full bg-transparent border-2 outline-none appearance-none border-secondary center',
            size === 'small' && 'h-6 text-sm px-2 rounded',
            size === 'medium' && 'h-10 pl-4 pr-10 rounded-lg'
          )}
          onChange={(event) => props?.onChange?.(event?.target?.value)}
        >
          {noDefault && (
            <option disabled selected={defaultSelected}>
              {promptText ?? null}
            </option>
          )}
          {children}
        </select>
        <svg
          className={clsx(
            'absolute right-0 z-0 transform rotate-90 fill-current text-primary pointer-events-none',
            size === 'small' && 'h-2 mr-2',
            size === 'medium' && 'h-3 mr-4'
          )}
          viewBox="0 0 15 18"
        >
          <path d="M15 9L-8.15666e-07 17.6603L-5.85621e-08 0.339745L15 9Z" />
        </svg>
      </div>
    </label>
  );
};
