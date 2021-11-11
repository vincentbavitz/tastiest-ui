import clsx from 'clsx';
import Link from 'next/link';
import React, { FC } from 'react';

export interface ISidebarItem {
  icon: FC<any>;
  label: string;
  page: string;
  float: 'top' | 'bottom';
}

export interface SidebarItemProps extends ISidebarItem {
  selected?: boolean;
  compact?: boolean;
}

export const SidebarItem = (props: SidebarItemProps) => {
  const { label, page, selected, compact } = props;

  return (
    <Link href={page}>
      <a className="no-underline">
        <div
          className={clsx(
            'text-gray-400 duration-150 hover:text-primary py-4 filter',
            compact ? 'px-6' : 'px-4',
            selected ? '-bg-primary-1' : 'bg-primary',
            'hover:brightness-95'
          )}
        >
          <div
            className={clsx(
              'flex flex-col items-center font-medium',
              compact && 'justify-center',
              selected ? 'text-light' : 'text-gray-300'
            )}
          >
            <props.icon
              className={clsx('h-6 stroke-current w-6 text-xl fill-current')}
            />

            {!compact && <p className={clsx()}>{label}</p>}
          </div>
        </div>
      </a>
    </Link>
  );
};
