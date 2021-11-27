import clsx from 'clsx';
import React, { FC } from 'react';
import { ComponentSize } from './types';

export interface IconButtonProps {
  icon: any;
  onClick?: () => void;
  size?: 'tiny' | ComponentSize;
  theme?: 'light' | 'primary' | 'secondary' | 'danger' | 'success';
  circle?: boolean;
}

export const IconButton: FC<IconButtonProps> = props => {
  const {
    icon: IconComponent,
    size = 'medium',
    theme = 'primary',
    circle = false,
    onClick,
  } = props;

  const styles = {
    focus: `focus:ring-2 ring-opacity-25 ring-${theme} outline-none`,
    theme: {
      primary: 'text-primary bg-light hover:bg-primary hover:text-light',
      secondary: 'text-secondary bg-light hover:bg-secondary hover:text-light',
      danger: 'text-danger bg-light hover:bg-danger hover:text-light',
      success: 'text-success bg-light hover:bg-success hover:text-light',
      light: 'text-gray-400 bg-light hover:text-gray-500',
    },
    size: {
      tiny: 'h-6 w-6 text-sm',
      small: 'h-8 w-8 text-base',
      medium: 'h-10 w-10 text-xl',
      large: 'h-12 w-12 text-2xl',
    },
  };

  return (
    <button
      onClick={onClick}
      className={clsx(
        'flex justify-center duration-300 shadow-md items-center select-none',
        circle ? 'rounded-full' : 'rounded-md',
        styles.theme[theme],
        styles.size[size],
        styles.focus,
      )}
    >
      <IconComponent className="" />
    </button>
  );
};
