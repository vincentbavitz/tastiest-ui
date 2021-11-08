import clsx from 'clsx';
import React, { FC } from 'react';

// Simplest use is to define your options and map over them to product JSX and your desired onSelect; eg:
// options?.map(option => <DropdownItem onSelect={() => setDropdownItem(option.key)})}</Dropdown>
export interface DropdownItemProps {
  id: string;
  center?: boolean;
  selected?: boolean;
  onSelect?(): void;
  style?: 'default' | 'outline';
  children: JSX.Element | JSX.Element[] | string;
}

export const DropdownItem: FC<DropdownItemProps> = props => {
  const {
    id,
    children,
    center,
    onSelect,
    selected = false,
    style = 'default',
  } = props;

  const handleOnSelect = () => {
    if (onSelect) {
      onSelect();
    }
  };

  return (
    <div
      id={id}
      onClick={() => handleOnSelect()}
      style={{ minWidth: '5rem' }}
      className={clsx(
        'flex items-center',
        'block',
        'font-roboto text-sm text-primary',
        'hover:text-opacity-100 text-opacity-75',
        'select-none',
        'cursor-pointer',
        style === 'default' &&
          'border-b border-secondary border-opacity-25 font-semibold py-2 mx-3',
        style === 'outline' && ['pl-4', 'pr-6', 'py-1'],
        selected && 'bold text-opacity-100',
        center && 'justify-center',
      )}
    >
      {children}
    </div>
  );
};
