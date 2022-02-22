/* eslint-disable @typescript-eslint/no-explicit-any */
import { WarningOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import clsx from 'clsx';
import React, {
  ChangeEvent,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useHoverDirty, useKeyPressEvent } from 'react-use';
import { Tooltip } from './Tooltip';
import { ComponentSize } from './types';

type InputVariant = 'default' | 'solid';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  id?: string;

  // Appearance
  size?: ComponentSize;
  color?: 'primary' | 'secondary' | 'neutral';
  variant?: InputVariant;

  // Applied to parent only
  className?: string;
  inputClassName?: string;

  // Content
  // Sublabel can be used as a subtle descriptor to the right of label
  label?: string;
  prefix?: JSX.Element;
  suffix?: JSX.Element;

  // Custom input. Eg for Stripe embedded inputs.
  input?: ReactElement;
  // For custom input control over focus
  forceFocus?: boolean;

  // Styling
  center?: boolean;

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

  // Transforms the input on before the new value is set
  // Eg format: value => value.toLowerCase()
  formatter?: (value: string) => string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const {
      className,
      inputClassName,
      type = 'text',
      center = false,
      size = 'medium',
      color = 'secondary',
      variant = 'default',
      forceFocus = false,
      style,
      prefix,
      label,
      suffix,
      disabled,
      formatter,
      onValueChange,
      onReturn,
      error,
      ...inputProps
    } = props;

    const wrapperRef = useRef(null);
    const isHovering = useHoverDirty(wrapperRef);

    // Focus
    const inputRef = useRef<HTMLInputElement>(null);

    // Value
    const [value, setValue] = useState<string>('');
    const [isFocused, setIsFocused] = useState(
      forceFocus || Boolean(props.value?.length)
    );

    const styles = {
      size: {
        small: 'h-8 text-sm',
        medium: 'h-10 text-base',
        large: 'h-12 text-base',
      },
      variant: {
        default: 'bg-transparent',
        solid: 'bg-white filter shadow',
      },
    };

    // Functions
    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
      // Call external onChange if it exists
      props.onChange?.(event);

      console.log('Input ➡️ event.target.value:', event.target.value);
      console.log(
        'Input ➡️ typeof event.target.value:',
        typeof event.target.value
      );

      const element = event?.target as HTMLInputElement;
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

      const _value = formatter?.(element.value) ?? element.value;
      onValueChange?.(_value);
      setValue(_value);
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
    const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
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

    const CustomNestedInput = React.useMemo(() => {
      if (!props.input) {
        return null;
      }

      return React.cloneElement(props.input, {
        onFocus: () =>
          props.readOnly || props.disabled ? null : setIsFocused(true),
        onBlur: handleOnBlur,
        disabled: disabled,
      });
    }, []);

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
          placement="top-start"
        >
          <div className="relative w-0 h-0"></div>
        </Tooltip>

        <div className="relative flex items-center gap-3">
          {label ? (
            <InputLabel
              color={color}
              isFocused={forceFocus || isFocused}
              hasPrefix={Boolean(prefix)}
              label={label}
              size={size}
            />
          ) : null}

          <div
            style={{
              width: '100%',
            }}
            className={clsx(
              'flex',
              'items-center',
              'appearance-none',
              'text-gray-700',
              'leading-tight',
              'duration-150',
              size === 'small' ? 'px-2' : 'px-3',
              disabled && 'opacity-75 cursor-not-allowed',
              styles.variant[variant],
              className
            )}
          >
            {prefix && (
              <div
                className={clsx(
                  'text-black flex justify-center items-center',
                  'pr-2 w-6'
                )}
              >
                {prefix}
              </div>
            )}

            {CustomNestedInput ? (
              CustomNestedInput
            ) : (
              <input
                ref={ref || inputRef}
                className={clsx(
                  'bg-transparent',
                  'outline-none leading-none',
                  'w-0 flex-1',
                  disabled && 'cursor-not-allowed',
                  center && 'text-center',
                  styles.size[size],
                  inputClassName
                )}
                {...inputProps}
                type={type}
                value={value}
                spellCheck={false}
                onChange={handleOnChange}
                onFocus={() =>
                  props.readOnly || props.disabled ? null : setIsFocused(true)
                }
                onBlur={handleOnBlur}
                disabled={disabled}
                placeholder={label ? '' : props.placeholder}
              ></input>
            )}

            <InputBorder
              label={label}
              color={color}
              isHovering={isHovering}
              isFocused={forceFocus || isFocused}
              hasError={Boolean(error)}
              variant={variant}
            />

            {suffix ? (
              <span
                className={clsx(`text-primary`, 'flex', 'items-center', 'pl-2')}
              >
                {suffix}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
);

interface InputLabelProps {
  label: string;
  color: string;
  isFocused: boolean;
  hasPrefix: boolean;
  size: ComponentSize;
}

export const InputLabel = (props: InputLabelProps) => {
  const { label, color, hasPrefix, isFocused, size } = props;

  const translateX = isFocused ? `${hasPrefix ? '-0.95' : '0.70'}rem` : '0rem';
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
        'absolute top-0 right-0 flex items-center leading-0 duration-150 pointer-events-none whitespace-nowrap select-none',
        isFocused ? '' : 'overflow-hidden',
        isFocused ? 'text-xs font-medium' : fontSize,
        hasPrefix ? 'left-8 ml-px pl-px' : 'left-2',
        isFocused ? `text-${color}` : 'text-gray-600',
        isFocused ? '' : 'bottom-0'
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

const FieldSet = styled.fieldset`
  text-align: left;
  position: absolute;
  bottom: 0;
  right: 0;
  top: -5px;
  left: 0;
  margin: 0;
  padding: 0 8px;
  pointer-events: none;
  overflow: hidden;
  min-width: 0%;
  z-index: 0;
`;

const Legend = styled.legend`
  display: block;
  height: 11px;
  padding: 0;
  margin-left: 5px;
  font-size: 0.75rem;
  visibility: hidden;
  width: auto;
  transition: max-width 150ms cubic-bezier(0, 0, 0.2, 1) 0ms;
`;

interface InputBorderProps {
  label?: string;
  color: string;
  isHovering: boolean;
  isFocused: boolean;
  hasError: boolean;
  variant: InputVariant;
}

export const InputBorder = (props: InputBorderProps) => {
  const { label, color, isHovering, isFocused, hasError, variant } = props;

  const borderColors = clsx(
    isHovering || isFocused ? 'border-opacity-100' : 'border-opacity-75',
    color === 'primary' && 'border-primary',
    color === 'secondary' && 'border-secondary',
    color === 'neutral' && 'border-gray-400'
  );

  const borderStyles = clsx(
    isFocused ? 'border-2' : 'border',
    hasError ? 'border-danger' : borderColors
  );

  return (
    <FieldSet
      className={clsx(
        variant === 'default' && borderStyles,
        isFocused ? '' : ''
      )}
    >
      <Legend
        style={{
          maxWidth: isFocused ? '100%' : '0.01px',
        }}
      >
        {label?.length ? (
          <span style={{ paddingLeft: '5px', paddingRight: '5px' }}>
            {label}
          </span>
        ) : null}
      </Legend>
    </FieldSet>
  );
};
