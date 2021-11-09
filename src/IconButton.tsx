import clsx from 'clsx';
import React from 'react';

export interface IconButtonProps {
  icon: any;
  theme: 'primary' | 'secondary' | 'danger' | 'success';
  onClick?: () => void;
}

export default function IconButton(props: IconButtonProps) {
  const { icon: IconComponent, theme, onClick } = props;

  return (
    <button
      onClick={onClick}
      className={clsx(
        'h-10 w-10 flex justify-center duration-300 shadow-md items-center rounded-md',
        theme === 'primary' &&
          'text-primary bg-light hover:bg-primary hover:text-light',
        theme === 'secondary' &&
          'text-secondary bg-light hover:bg-secondary hover:text-light',
        theme === 'danger' &&
          'text-danger bg-light hover:bg-danger hover:text-light',
        theme === 'success' &&
          'text-success bg-light hover:bg-success hover:text-light'
      )}
    >
      <IconComponent className="text-xl" />
    </button>
  );
}
