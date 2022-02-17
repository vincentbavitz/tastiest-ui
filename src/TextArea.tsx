import { WarningOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useHoverDirty, useKeyPressEvent } from 'react-use';
import { InputBorder, Tooltip } from '.';
import { ComponentSize } from './types';

export interface TextAreaProps
  extends Omit<
    React.InputHTMLAttributes<HTMLTextAreaElement>,
    'size' | 'prefix'
  > {
  id?: string;

  // Appearance
  size?: ComponentSize;
  color?: 'primary' | 'secondary' | 'neutral';

  // Applied to parent only
  className?: string;
  inputClassName?: string;

  label?: string;

  // Error message displayed above the input
  // This is used in controlled react-hook-forms
  // but can also be set manually if you like.
  error?: string;

  // Values
  // If value is not given in props, the component will manage it through state (default)
  value?: string;
  onValueChange?(value: string): void;

  // For forms, where the Return key should make an action
  onReturn?: () => void;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const {
      className,
      inputClassName,
      type = 'text',
      size = 'medium',
      color = 'secondary',
      style,
      label,
      disabled,
      onValueChange,
      onReturn,
      error,
      ...textareaProps
    } = props;

    const wrapperRef = useRef(null);
    const isHovering = useHoverDirty(wrapperRef);

    // Focus
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Value
    const [value, setValue] = useState<string>('');
    const [isFocused, setIsFocused] = useState(Boolean(props.value?.length));

    const styles = {
      size: {
        small: 'text-sm',
        medium: 'text-base',
        large: 'text-base',
      },
      variant: {
        default: 'bg-transparent',
        solid: 'bg-white rounded filter shadow',
      },
    };

    // Functions
    const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      // Call external onChange if it exists
      props.onChange?.(event);

      console.log('Input ➡️ event.target.value:', event.target.value);
      console.log(
        'Input ➡️ typeof event.target.value:',
        typeof event.target.value
      );

      const element = event?.target as HTMLTextAreaElement;
      if (element?.value === undefined) {
        console.log('exiting here');
        setValue('');
        return;
      }

      console.log('Input ➡️ value:', value);

      // Force focus on autocomplete
      if (element.value.length > 0) {
        setIsFocused(true);
      }

      onValueChange?.(element.value);
      setValue(element.value);
    };

    /**
     * We must pass isFocused as a param because the
     * action of hitting 'Enter' changes the isFocused state.
     */
    const handleOnReturn = (_isFocused: boolean) => {
      if (_isFocused) {
        onReturn?.();
      }
    };

    useKeyPressEvent('Enter', () => handleOnReturn(isFocused));

    // Handle onBlur to accept external values.
    // Eg. from react-hook-form
    const handleOnBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
      // Call external onBlur if it exists
      props.onBlur?.(event);

      if (value.length === 0) {
        setIsFocused(false);
      }
    };

    // Keep value in sync with props.
    // This ensures that formatter works
    useEffect(() => {
      setValue(typeof props.value === 'undefined' ? '' : props.value);
    }, [props.value]);

    // Always focus when value changes
    useEffect(() => {
      if (value.length) {
        setIsFocused(true);
      }
    }, [value]);

    return (
      <div
        ref={wrapperRef}
        className="relative w-full font-secondary cursor-text"
      >
        <Tooltip
          show={Boolean(error)}
          hideDelay={2500}
          resetHideDeps={[error, value.length === 0]}
          trigger="manual"
          content={
            <div className="flex items-center space-x-2 whitespace-nowrap">
              <WarningOutlined className="text-yellow-600" />
              <p>{error}</p>
            </div>
          }
          placement="top-end"
        >
          <div className="relative w-0 h-0"></div>
        </Tooltip>

        <div className="relative flex gap-3">
          {label ? (
            <TextAreaLabel
              color={color}
              isFocused={isFocused}
              label={label}
              size={size}
            />
          ) : null}

          <div
            style={{
              width: '100%',
            }}
            className={clsx(
              'flex items-center pt-2 appearance-none',
              'text-gray-700',
              'leading-tight',
              'duration-150',
              disabled && 'opacity-75 cursor-not-allowed',
              styles.variant['default'],
              className
            )}
          >
            <textarea
              ref={ref || textareaRef}
              className={clsx(
                'bg-transparent',
                'outline-none leading-tight',
                'w-0 flex-1',
                disabled && 'cursor-not-allowed',
                size === 'small' ? 'px-2 py-1' : 'px-3 py-2',
                styles.size[size],
                inputClassName
              )}
              {...textareaProps}
              spellCheck={false}
              value={value}
              onChange={handleOnChange}
              onFocus={() =>
                props.readOnly || props.disabled ? null : setIsFocused(true)
              }
              onBlur={handleOnBlur}
              disabled={disabled}
              placeholder={label ? '' : props.placeholder}
            ></textarea>

            <InputBorder
              label={label}
              color={color}
              isHovering={isHovering}
              isFocused={isFocused}
              hasError={Boolean(error)}
              variant={'default'}
            />
          </div>
        </div>
      </div>
    );
  }
);

interface TextAreaLabelProps {
  label: string;
  color: string;
  isFocused: boolean;
  size: ComponentSize;
}

export const TextAreaLabel = (props: TextAreaLabelProps) => {
  const { label, color, isFocused, size } = props;

  const translateX = isFocused ? '0.70rem' : '0rem';
  const translateY = isFocused ? '-0.35rem' : '0rem';

  const fontSize = clsx(
    size === 'large' && 'text-base',
    size === 'medium' && 'text-base',
    size === 'small' && 'text-sm'
  );

  return (
    <div
      style={{
        transform: `translate(${translateX}, ${translateY})`,
      }}
      className={clsx(
        'absolute right-0 left-2 flex items-center leading-0 duration-150 pointer-events-none whitespace-nowrap select-none',
        isFocused ? '' : 'overflow-hidden',
        isFocused ? 'text-xs font-medium' : fontSize,
        isFocused ? `text-${color}` : 'text-gray-600',
        isFocused ? 'top-0' : 'top-2'
      )}
    >
      <div
        style={{
          height: isFocused ? '11px' : 'unset',
          fontSize: isFocused ? '0.75rem' : 'unset',
        }}
      >
        {label}
      </div>
    </div>
  );
};
