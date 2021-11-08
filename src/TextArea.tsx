import clsx from 'clsx';
import React, { ChangeEvent, FocusEvent, useRef, useState } from 'react';
import './tailwind.css';

export interface TextAreaProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    'size' | 'prefix'
  > {
  size?: 'large' | 'medium' | 'small';
  color?: 'primary' | 'secondary' | 'neutral';

  // Content
  label?: string;
  labelTheme?: 'primary' | 'normal';

  // Styling
  disabled?: boolean;
  readonly?: boolean;

  // Value
  // If value is not given in props, the component will manage it through state (default)
  value?: string | number;
  onValueChange?(value: string): void;

  // Allows you to only accept values which satisfy this pattern
  regex?: RegExp;
  onBlurRegex?: RegExp;
  // The warning given when invalid on blur.
  onBlurInvalidWarning?: string;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const {
      size = 'medium',
      color = 'secondary',
      label,
      labelTheme,
      disabled,
      regex,
      ...textareaProps
    } = props;

    // Focus
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const setFocus = () => {
      if (typeof inputRef !== 'string') {
        inputRef?.current?.focus();
      }
    };

    // Value
    const [value, setValue] = useState('' as string | number);
    const [hasFocus, setHasFocus] = useState(false);

    // Styles
    const fontSize =
      size === 'large'
        ? 'text-lg'
        : size === 'medium'
        ? 'text-base'
        : 'text-sm';

    // Functions
    const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const element = event?.target as HTMLTextAreaElement;
      if (element.value === undefined) {
        return;
      }

      if (props.onValueChange) {
        props.onValueChange(element.value);
      }

      if (props.onChange) {
        props.onChange(event);
      }

      setValue(element.value);
    };

    const handleOnBlur = (event: FocusEvent<HTMLTextAreaElement>) => {
      setHasFocus(false);

      if (props.onBlur) {
        props.onBlur(event);
      }
    };

    const handleOnFocus = (event: FocusEvent<HTMLTextAreaElement>) => {
      props?.onFocus?.(event);
    };

    const colorStyles = clsx(
      color === 'primary' && [
        hasFocus ? 'border-primary-1' : 'border-primary',
        'hover:-border-primary-1',
      ],
      color === 'secondary' && [
        hasFocus ? 'border-primary' : 'border-secondary',
        'hover:border-primary',
      ],
      color === 'neutral' && hasFocus ? 'border-gray-400' : 'border-gray-300',
      'hover:-border-gray-300',
    );

    return (
      <div>
        {label && (
          <div
            className={clsx(
              'mb-1',
              size === 'small' ? 'text-sm' : 'text-base',
              labelTheme === 'primary' &&
                'text-primary font-medium tracking-wide',
            )}
          >
            {label}
          </div>
        )}

        <div className="flex items-center space-x-3">
          <div
            className={clsx(
              'flex',
              'items-center',
              'appearance-none',
              'w-full',
              'text-gray-700',
              'leading-tight',
              'duration-300 rounded-md',
              'border-2 py-1',
              colorStyles,
              size === 'small' ? 'px-2' : 'px-4',
              disabled && 'opacity-75 cursor-not-allowed',
            )}
            onClick={setFocus}
          >
            <textarea
              ref={ref || inputRef}
              className={clsx(
                'bg-transparent',
                'outline-none',
                'flex-1',
                'w-0',
                disabled && 'cursor-not-allowed',
                fontSize,
                size === 'small' && 'py-0',
                size === 'medium' && 'py-2',
                size === 'large' && 'py-2',
              )}
              {...textareaProps}
              value={props.value ?? value}
              disabled={disabled}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              onFocus={handleOnFocus}
            />
          </div>
        </div>
      </div>
    );
  },
);
