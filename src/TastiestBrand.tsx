import clsx from 'clsx';
import React, { FC } from 'react';

export interface TastiestBrandProps {
  size?: 6 | 8 | 10;
  fill?: boolean;
  type?: 'initial' | 'initial-ring' | 'full';
  theme?: 'light' | 'dark';
}

export const TastiestBrand: FC<TastiestBrandProps> = ({
  type = 'initial-ring',
  size = 8,
  fill = false,
  theme = 'light',
}) => {
  return (
    <div>
      {type === 'initial' || type === 'initial-ring' ? (
        <div
          className={clsx(
            'flex items-center justify-center duration-500 font-primary font-medium no-underline rounded-full',
            theme === 'light'
              ? 'ring-primary text-primary'
              : 'ring-light text-light',
            type === 'initial-ring' && 'ring-2',
            fill ? 'bg-primary text-light' : 'text-primary',
            size === 6 && 'w-6 h-6 text-xl',
            size === 8 && 'w-8 h-8 text-2xl',
            size === 10 && 'w-10 h-10 text-3xl',
          )}
        >
          T
        </div>
      ) : (
        <div
          className={clsx(
            'font-primary leading-none',
            size === 6 && 'text-2xl',
            size === 8 && 'text-3xl',
            size === 10 && 'text-4xl',
            theme === 'dark' ? 'text-light' : 'text-dark',
          )}
        >
          Tastiest
          <span
            className={clsx(
              'no-underline',
              theme === 'dark' ? 'text-secondary' : 'text-primary',
            )}
          >
            .
          </span>
        </div>
      )}
    </div>
  );
};
