import { LoadingOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import React, { FC, ReactNode } from 'react';
import './tailwind.css';
import { ComponentSize } from './types';

export interface ButtonProps {
  // eslint-disable-next-line prettier/prettier
  color?: 'primary' | 'secondary' | 'light' | 'danger' | 'success';
  type?: 'text' | 'solid' | 'outline';
  size?: 'tiny' | ComponentSize;
  wide?: boolean;

  onClick?: () => void;

  // States
  selected?: boolean;
  disabled?: boolean;
  loading?: boolean;

  // Icons
  prefix?: JSX.Element;
  suffix?: JSX.Element;
  children?: ReactNode;

  // For button groups
  flatEdge?: 'left' | 'right' | 'both';
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    color = 'secondary',
    size = 'medium',
    type = 'solid',
    disabled = false,
    selected = false,
    loading = false,
    onClick,
    children,
    prefix,
    suffix,
    flatEdge,
    wide = false,
  } = props;

  const onClickFn = (e: React.MouseEvent) => {
    if (disabled || loading) {
      return;
    }

    if (onClick) {
      e?.stopPropagation && e?.stopPropagation();
      onClick();
    }
  };

  // Conditional `touch` makes buttons more touch friendly
  // with more padding
  const sizeStyles = clsx(
    size === 'large' ? clsx('text-lg', 'py-2') : null,
    size === 'medium' ? clsx('text-base', 'py-1') : null,
    size === 'small' ? clsx('text-sm', 'py-1') : null,
    size === 'tiny' ? clsx('text-xs', 'py-0') : null
  );

  const border = clsx(
    'border-2',
    'border-solid',
    color === 'primary'
      ? 'border-primary'
      : color === 'secondary'
      ? 'border-secondary'
      : color === 'light'
      ? 'border-light'
      : color === 'danger'
      ? 'border-danger'
      : color === 'success'
      ? 'border-success'
      : ''
  );

  const textTypeStyles = clsx(
    'border-2 border-transparent',
    color === 'primary'
      ? ['text-primary', disabled ? null : 'hover:border-primary']
      : color === 'secondary'
      ? ['text-secondary', disabled ? null : 'hover:border-secondary']
      : color === 'light'
      ? ['text-light', disabled ? null : 'hover:border-light']
      : color === 'danger'
      ? ['text-danger', disabled ? null : 'hover:border-danger']
      : color === 'success'
      ? ['text-success', disabled ? null : 'hover:border-success']
      : ''
  );

  const outlineStyles = clsx(
    // prettier-ignore
    color === 'primary'
      ? ['text-primary', disabled ? null : 'hover:bg-primary hover:text-white']
    : color === 'secondary'
      ? ['text-secondary', disabled ? null : 'hover:bg-secondary hover:text-white']
    : color === 'light'
      ? ['text-light', disabled ? null : `hover:bg-light hover:text-dark ${flatEdge ? '' : 'filter drop-shadow-md'}`]
    : color === 'danger'
      ? ['text-danger', disabled ? null : 'hover:bg-danger hover:text-light']
    : color === 'success'
      ? ['text-success', disabled ? null : 'hover:bg-success hover:text-light']
    : '',
    border
  );

  const solidStyles = clsx(
    color === 'primary'
      ? 'bg-primary text-light'
      : color === 'secondary'
      ? 'bg-secondary text-light'
      : color === 'light'
      ? [
          'text-dark',
          flatEdge ? '' : 'filter drop-shadow-md',
          selected ? 'bg-indigo-300 bg-opacity-25' : 'bg-light',
        ]
      : color === 'danger'
      ? 'bg-danger text-light'
      : color === 'success'
      ? 'bg-success text-light'
      : '',
    { [`hover:brightness-125`]: !disabled }
  );

  // prettier-ignore
  const ringSize = 
    size === 'large' ? 4 :
    size === 'medium' ? 4 :
    size === 'small' ? 2 :
    size === 'tiny' ? 0 : 0;

  const selectedStyles = clsx(
    color === 'primary'
      ? 'ring-primary'
      : color === 'secondary'
      ? 'ring-secondary'
      : color === 'light'
      ? 'ring-blue-400'
      : color === 'danger'
      ? 'ring-danger'
      : color === 'success'
      ? 'ring-success'
      : '',
    `active:ring-${ringSize} focus:ring-${ringSize}`,
    selected && `ring-${ringSize} filter brightness-110`
  );

  const disabledStyles = disabled
    ? [color === 'light' ? '' : '!brightness-90', '!cursor-not-allowed']
    : 'cursor-pointer';

  // prettier-ignore
  const typeStyles = clsx(
    type === 'solid' ? solidStyles : null,
    type === 'text' ? textTypeStyles : null,
    type === 'outline' ? outlineStyles : null,
  );

  // prettier-ignore
  const roundedStyles = 
    flatEdge === 'left' ? 'rounded-r-md' :
    flatEdge === 'right' ? 'rounded-l-md' :
    flatEdge === 'both' ? 'rounded-none' :
    'rounded-md';

  return (
    <button
      style={{ width: wide ? '100%' : 'min-content' }}
      className={clsx(
        'flex',
        'justify-center',
        'items-center',
        'px-4',
        'outline-none',
        'filter duration-300',
        'ease-in-out',
        'text-center',
        'whitespace-nowrap',
        'ring-opacity-25',
        'select-none',
        sizeStyles,
        typeStyles,
        roundedStyles,
        selectedStyles,
        disabledStyles
      )}
      role="button"
      tabIndex={1}
      onClick={onClickFn}
    >
      {loading && (
        <div className="absolute flex items-center justify-center h-6">
          <LoadingOutlined
            className={clsx(
              size === 'large' && 'text-2xl',
              size === 'medium' && 'text-lg',
              size === 'small' && 'text-base'
            )}
          />
        </div>
      )}

      {prefix && (
        <div
          className={clsx(
            'flex items-center',
            children ? 'pr-2' : null,
            loading ? 'opacity-0' : 'opacity-100'
          )}
        >
          {prefix}
        </div>
      )}

      <div
        className={clsx(
          'w-full font-normal',
          loading ? 'opacity-0' : 'opacity-100'
        )}
      >
        {children}
      </div>

      {suffix && (
        <div
          className={clsx(
            'flex',
            'items-center',
            children ? 'pl-2' : null,
            loading ? 'opacity-0' : 'opacity-100'
          )}
        >
          {suffix}
        </div>
      )}
    </button>
  );
};
