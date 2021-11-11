/* eslint-disable @typescript-eslint/no-explicit-any */
import { WarningOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useHoverDirty } from 'react-use';
import styled from 'styled-components';
import { Tooltip } from './Tooltip';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  id?: string;

  // Applied to parent only
  className?: string;
  inputClassName?: string;

  // If value is not given in props, the component will manage it through state (default)
  type?: 'text' | 'number' | 'search' | 'email' | 'password' | 'tel';
  name?: string;
  size?: 'large' | 'medium' | 'small';
  color?: 'primary' | 'secondary' | 'neutral';

  // Content
  // Sublabel can be used as a subtle descriptor to the right of label
  label: string;
  prefix?: JSX.Element;
  suffix?: JSX.Element;

  // Styling
  disabled?: boolean;
  center?: boolean;

  // Error message displayed above the input
  // This is used in controlled react-hook-forms
  // but can also be set manually if you like.
  error?: string;

  // Values
  value?: string;
  onValueChange?(value: string): void;

  // Transforms the input on before the new value is set
  // Eg format: value => value.toLowerCase()
  formatter?: (value: string) => string;

  // Allows you to only accept values which satisfy this pattern
  regex?: RegExp;
  onBlurRegex?: RegExp;
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
      style,
      prefix,
      label,
      suffix,
      disabled,
      regex,
      formatter,
      onValueChange,
      error,
      ...inputProps
    } = props;

    const wrapperRef = useRef(null);
    const isHovering = useHoverDirty(wrapperRef);

    // Focus
    const inputRef = useRef<HTMLInputElement>(null);

    // Value
    const [value, setValue] = useState<string>('');
    const [isFocused, setIsFocused] = useState(false);

    // Styles
    const fontSize = size === 'large' ? 'text-lg' : 'text-base';

    // Functions
    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
      const element = event?.target as HTMLInputElement;
      if (element?.value === undefined) {
        return;
      }

      // Force focus on autocomplete
      if (element.value.length > 0) {
        setIsFocused(true);
      }

      const _value = formatter?.(element.value) ?? element.value;

      // Test regex
      const isValid = regex ? regex?.test(String(_value)) : true;
      if (!isValid && _value.length > 0) return;

      // Emails don't support selectionStart
      if (type !== 'email') {
        const caret = element.selectionStart;
        window.requestAnimationFrame(() => {
          element.selectionStart = caret;
          element.selectionEnd = caret;
        });
      }

      if (onValueChange) {
        onValueChange(_value);
      }

      if (props.onChange) {
        props.onChange(event);
      }

      setValue(_value);
    };

    const sizeStyles = clsx(
      size === 'medium' && 'h-10 leading-10',
      size === 'small' && 'h-6 leading-6'
    );

    // Keep value in sync with props.
    // This ensures that formatter works
    useEffect(() => {
      if (props.value) {
        setValue(props.value);
      }
    }, [props.value]);

    return (
      <div ref={wrapperRef} className="w-full font-secondary cursor-text">
        <div className="relative flex items-center gap-3">
          <InputLabel
            size={size}
            color={color}
            isFocused={isFocused}
            hasPrefix={Boolean(prefix)}
            label={label}
          />

          {error && (
            <div className="absolute top-0 w-0 left-0">
              <Tooltip
                show
                content={
                  <div className="flex items-center space-x-2 whitespace-nowrap">
                    <WarningOutlined className="text-yellow-600" />
                    <p>{error}</p>
                  </div>
                }
                placement="top-end"
                unhideDependencies={[value, props.value, error]}
              >
                <div className="w-full h-0"></div>
              </Tooltip>
            </div>
          )}

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
              size === 'small' ? 'px-2' : 'px-4',
              disabled && 'opacity-75 cursor-not-allowed',
              className
            )}
          >
            {prefix && (
              <span
                className={clsx(`text-black`, 'flex', 'items-center', 'pr-4')}
              >
                {prefix}
              </span>
            )}

            <input
              ref={ref || inputRef}
              className={clsx(
                'bg-transparent',
                'outline-none leading-12',
                'w-0 flex-1',
                disabled && 'cursor-not-allowed',
                center && 'text-center',
                fontSize,
                sizeStyles,
                inputClassName
              )}
              {...inputProps}
              type={type}
              value={value}
              spellCheck={false}
              disabled={disabled}
              onChange={handleOnChange}
              onFocus={() =>
                props.readOnly || props.disabled ? null : setIsFocused(true)
              }
              onBlur={() => (value.length === 0 ? setIsFocused(false) : null)}
              placeholder={''}
            ></input>

            <InputBorder
              label={label}
              color={color}
              isHovering={isHovering}
              isFocused={isFocused}
              hasError={Boolean(error)}
            />

            {suffix ? (
              <span
                className={clsx(`text-primary`, 'flex', 'items-center', 'pl-4')}
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
  size: 'large' | 'medium' | 'small';
}

const InputLabel = (props: InputLabelProps) => {
  const { label, color, hasPrefix, isFocused, size } = props;

  return (
    <div
      style={{
        transform: `translate(${
          isFocused ? `${hasPrefix ? '-2.28' : '-0.175'}rem` : '0rem'
        }, ${isFocused ? '-1.25rem' : '0rem'})`,
      }}
      className={clsx(
        'absolute flex items-center leading-0 duration-150 pointer-events-none whitespace-nowrap select-none',
        isFocused
          ? 'text-xs font-medium'
          : size === 'small'
          ? 'text-sm'
          : 'text-base',
        hasPrefix ? 'left-12 ml-px pl-px' : 'left-4',
        isFocused ? `text-${color}` : 'text-gray-600'
      )}
    >
      <div
        style={{
          height: isFocused ? '11px' : 'unset',
          fontSize: isFocused ? '0.75em' : 'unset',
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
  padding: 0;
  height: 11px;
  font-size: 0.75em;
  visibility: hidden;
  width: auto;
  transition: max-width 150ms cubic-bezier(0, 0, 0.2, 1) 0ms;
`;

interface InputBorderProps {
  label: string;
  color: string;
  isHovering: boolean;
  isFocused: boolean;
  hasError: boolean;
}

const InputBorder = (props: InputBorderProps) => {
  const { label, color, isHovering, isFocused, hasError } = props;

  const borderColors = clsx(
    isHovering || isFocused ? 'border-opacity-100' : 'border-opacity-75',
    color === 'primary' && 'border-primary',
    color === 'secondary' && 'border-secondary',
    color === 'neutral' && 'border-gray-400'
  );

  const borderStyles = clsx(
    'rounded',
    isFocused ? 'border-2' : 'border',
    hasError ? 'border-danger' : borderColors
  );

  return (
    <FieldSet className={clsx(borderStyles, isFocused ? '' : '')}>
      <Legend
        style={{
          maxWidth: isFocused ? '100%' : '0.01px',
        }}
      >
        <span>{label}</span>
      </Legend>
    </FieldSet>
  );
};
