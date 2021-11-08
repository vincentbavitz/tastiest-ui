/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlertIcon } from '@tastiest-io/tastiest-icons';
import clsx from 'clsx';
import React, {
  ChangeEvent,
  CSSProperties,
  FocusEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Tooltip } from '.';

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
  label?: string;
  labelTheme?: 'primary' | 'normal';
  subLabel?: string | ReactNode;
  prefix?: JSX.Element;
  suffix?: JSX.Element;
  externalSuffix?: JSX.Element;

  // Styling
  disabled?: boolean;
  style?: CSSProperties;
  readonly?: boolean;
  center?: boolean;

  // Error message displayed above the input
  // This is used in controlled react-hook-forms
  // but can also be set manually if you like.
  error?: string;
  errorDisappearAfter?: number; // disappear tooltip after X milliseconds

  // Values
  value?: string | number;
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
      readonly = false,
      size = 'medium',
      color = 'secondary',
      style,
      prefix,
      label,
      labelTheme,
      subLabel,
      suffix,
      externalSuffix,
      disabled,
      regex,
      formatter,
      onValueChange,
      error,
      errorDisappearAfter = 3000,
      ...inputProps
    } = props;

    // Focus
    const inputRef = useRef<HTMLInputElement>(null);

    // Value
    const [value, setValue] = useState('' as string | number);
    const [hasFocus, setHasFocus] = useState(false);

    // Styles
    const fontSize = size === 'large' ? 'text-lg' : 'text-base';

    // Functions
    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
      const element = event?.target as HTMLInputElement;
      if (element?.value === undefined) {
        return;
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

    const handleOnBlur = (event: FocusEvent<HTMLInputElement>) => {
      setHasFocus(false);

      if (props.onBlur) {
        props.onBlur(event);
      }
    };

    const handleOnFocus = (event: FocusEvent<HTMLInputElement>) => {
      if (!readonly) {
        setHasFocus(true);
      }

      if (props.onFocus) {
        props.onFocus(event);
      }
    };

    const borderColors = clsx(
      color === 'primary' && [
        hasFocus ? 'border-secondary' : 'border-primary',
        'hover:border-secondary',
      ],
      color === 'secondary' && [
        hasFocus ? 'border-primary' : 'border-secondary',
        'hover:border-primary',
      ],
      color === 'neutral' && [
        hasFocus ? 'border-gray-500' : 'border-gray-400',
        'hover:border-gray-500',
      ],
    );

    const colorStyles = error ? 'border-danger' : borderColors;

    const sizeStyles = clsx(
      size === 'medium' && 'h-10 leading-10',
      size === 'small' && 'h-6 leading-6',
    );

    // Keep value in sync with props.
    // This ensures that formatter works
    useEffect(() => {
      if (props.value) {
        setValue(props.value);
      }
    }, [props.value]);

    return (
      <div className="w-full cursor-text">
        {label || subLabel ? (
          <div
            className={clsx(
              'flex justify-between mb-1 items-end leading-0',
              size === 'small' ? 'text-sm' : 'text-base',
              labelTheme === 'primary' &&
                'text-primary font-medium tracking-wide',
            )}
          >
            {label ? <div>{label}</div> : null}
            {subLabel ? <div>{subLabel}</div> : null}
          </div>
        ) : null}

        {error && (
          <div className="flex justify-end">
            <div className="pr-6 w-min">
              <Tooltip
                isOpen={true}
                size="small"
                content={
                  <div className="flex items-center space-x-2 whitespace-nowrap">
                    <AlertIcon className="h-4 fill-current text-danger" />
                    <p>{error}</p>
                  </div>
                }
                placement="top-right"
                hideAfter={errorDisappearAfter}
                unhideDependencies={[value, props.value, error]}
              >
                <div className="flex-1 h-0"></div>
              </Tooltip>
            </div>
          </div>
        )}

        <div className="flex items-center space-x-3">
          <div
            style={style ?? {}}
            className={clsx(
              'flex',
              'items-center',
              'appearance-none',
              'w-full',
              'text-gray-700',
              'leading-tight',
              'duration-300',
              'border-l-2 rounded',
              'bg-primary bg-opacity-10',
              hasFocus ? 'ring-2 ring-secondary ring-opacity-25' : '',
              colorStyles,
              size === 'small' ? 'px-2' : 'px-4',
              disabled && 'opacity-75 cursor-not-allowed',
              className,
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
                'flex-1',
                'w-0',
                externalSuffix && 'w-full',
                disabled && 'cursor-not-allowed',
                center && 'text-center',
                fontSize,
                sizeStyles,
                inputClassName,
              )}
              {...inputProps}
              type={type}
              value={value}
              spellCheck={false}
              disabled={disabled}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              onFocus={handleOnFocus}
            ></input>

            {suffix && (
              <span
                className={clsx(`text-primary`, 'flex', 'items-center', 'pl-4')}
              >
                {suffix}
              </span>
            )}
          </div>

          {externalSuffix}
        </div>
      </div>
    );
  },
);
