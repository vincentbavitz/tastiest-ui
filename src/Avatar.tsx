import classNames from 'classnames';
import clsx from 'clsx';
import React from 'react';
import { TastiestBrand } from './TastiestBrand';

export interface AvatarProps {
  // Size is in the same units as Tailwind units
  size?: 6 | 8 | 10 | 12 | 16 | 20;
  initial?: string;
  imageSrc?: string;
  onClick?(): void;
}

export function Avatar(props: AvatarProps) {
  const { size = 8, imageSrc, initial, onClick } = props;

  return (
    <div
      onClick={onClick}
      className={classNames(
        'relative flex justify-center items-center rounded-full cursor-pointer duration-300',
        'bg-primary',
        imageSrc
          ? 'hover:ring-2 ring-secondary ring-opacity-25'
          : 'filter hover:brightness-125',
        `h-${size} w-${size}`,
      )}
    >
      {imageSrc ? (
        // Custom Avatar Image
        <img
          className="w-full h-full rounded-full"
          src={imageSrc}
          alt={'Author profile picture'}
        />
      ) : initial?.length ? (
        <div
          className={clsx(
            'flex items-center justify-center w-full h-full text-white font-primary',
            size === 6 ? 'text-base' : 'text-xl',
          )}
        >
          {initial[0]}
        </div>
      ) : (
        // Default Tastiest Avatar
        <TastiestBrand fill type="initial" />
      )}
    </div>
  );
}
