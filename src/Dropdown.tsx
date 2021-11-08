import clsx from 'clsx';
import React, { FC, ReactNode, useRef } from 'react';
import { useClickAway } from 'react-use';

export interface DropdownProps {
  isOpen: boolean;
  pull?: 'left' | 'right' | 'center';
  style?: 'default' | 'outline';
  opacity?: 25 | 50 | 75 | 100;
  onClickAway: () => void;

  offsetX?: number;
  offsetY?: number;

  // Use DropdownItem
  children?: ReactNode;
}

export const Dropdown: FC<DropdownProps> = props => {
  // Ensure children are all DropdownItems
  const {
    isOpen,
    pull = 'right',
    style = 'default',
    opacity = 100,
    offsetX,
    offsetY,
    onClickAway,
    children,
  } = props;

  const ref = useRef(null);
  useClickAway(ref, onClickAway);

  return (
    <div
      className={clsx(
        'flex w-full',
        pull === 'left' && 'justify-start',
        pull === 'center' && 'justify-center',
        pull === 'right' && 'justify-end',
      )}
    >
      <div style={{ zIndex: 1000 }} className="relative h-0">
        <div
          style={{
            width: 'max-content',
            marginLeft: offsetX ? `${offsetX}px` : 'unset',
            marginTop: offsetY ? `${offsetY}px` : '0.5rem',
          }}
          className={clsx(isOpen ? 'block' : 'hidden')}
        >
          <div
            ref={ref}
            style={{ filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.11))' }}
            className={clsx(
              'bg-white',
              'duration-300',
              'rounded-md',
              'children:last:border-b-0',
              `bg-opacity-${opacity}`,
              style === 'default' && ['pt-2'],
              style === 'outline' && ['py-2', 'border-2', 'border-secondary'],
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
