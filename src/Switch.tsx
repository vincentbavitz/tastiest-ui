import { Switch as HeadlessSwitch } from '@headlessui/react';
import clsx from 'clsx';
import React, { FC } from 'react';
import { ComponentSize } from './types';

export interface SwitchProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  size?: ComponentSize;
}

export const Switch: FC<SwitchProps> = (props) => {
  const { checked, onChange, size = 'medium' } = props;

  const styles = {
    switch: {
      large: 'h-7 w-12',
      medium: 'h-6 w-10',
      small: 'h-4 w-7',
    },
    span: {
      checked: {
        large: 'translate-x-5',
        medium: 'translate-x-4',
        small: 'translate-x-3',
      },
      large: 'h-6 w-6',
      medium: 'h-5 w-5',
      small: 'h-3 w-3',
    },
  };

  return (
    <div className="py-16">
      <HeadlessSwitch
        checked={checked}
        onChange={onChange}
        className={clsx(
          'relative inline-flex flex-shrink-0 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75',
          checked ? 'bg-secondary' : 'bg-primary',
          styles.switch[size]
        )}
      >
        <span
          aria-hidden="true"
          className={clsx(
            'pointer-events-none rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200',
            checked ? styles.span.checked[size] : 'translate-x-0',
            styles.span[size]
          )}
        />
      </HeadlessSwitch>
    </div>
  );
};
