import clsx from 'clsx';
import React, { FC } from 'react';

type Size = 5 | 6 | 8 | 10;
type Type = 'initial' | 'initial-ring' | 'full';
type Theme = 'light' | 'dark';

export interface TastiestBrandProps {
  fill?: boolean;
  size?: Size;
  type?: Type;
  theme?: Theme;
  onClick?: () => void;
}

export const TastiestBrand: FC<TastiestBrandProps> = (props) => {
  const { type = 'initial-ring', size = 8, theme = 'light', onClick } = props;

  return (
    <div onClick={onClick} className="select-none">
      {type === 'initial' || type === 'initial-ring' ? (
        <TastiestRing {...props} />
      ) : (
        <div
          className={clsx(
            'font-primary leading-none duration-500',
            size === 6 && 'text-2xl',
            size === 8 && 'text-3xl',
            size === 10 && 'text-4xl',
            theme === 'dark' ? 'text-light' : 'text-dark'
          )}
        >
          Tastiest
          <span
            className={clsx(
              'no-underline',
              theme === 'dark' ? 'text-secondary' : 'text-primary'
            )}
          >
            .
          </span>
        </div>
      )}
    </div>
  );
};

interface TastiestRingProps {
  size?: Size;
  type?: Omit<Type, 'full'>;
  theme?: Theme;
  fill?: boolean;
}

const TastiestRing: FC<TastiestRingProps> = (props) => {
  const { fill, type, size = 8, theme = 'light' } = props;

  const sizeStyles = `h-${size} w-${size}`;

  return (
    <div
      style={{ fontSize: `${size * 0.25}rem` }}
      className={clsx(
        'flex items-center justify-center duration-500 font-primary font-medium no-underline rounded-full',
        type === 'initial-ring' && 'ring-2',
        theme === 'light'
          ? 'ring-primary text-primary'
          : 'ring-light text-light',
        fill ? 'bg-primary !text-light' : '',
        sizeStyles
      )}
    >
      <span style={{ marginTop: '7.5%' }}>T</span>
    </div>
  );
};
