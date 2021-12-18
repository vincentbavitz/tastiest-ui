import clsx from 'clsx';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { ComponentSize } from '.';
import { TastiestBrand } from './TastiestBrand';

export interface BreadcrumbsProps {
  children: ReactElement<CrumbProps> | ReactElement<CrumbProps>[];
  size?: ComponentSize;
}

/**
 * The default behaviour is to make the last child unselected
 * as the "current page". You can override this behaviour by passing
 * `selected` as individual props to your crumbs.
 */
export function Breadcrumbs(props: BreadcrumbsProps) {
  const { children, size = 'medium' } = props;

  return (
    <div className="flex space-x-1 items-center flex-nowrap">
      <Link href="/">
        <a className="no-underline mr-1">
          <TastiestBrand size={5} type="initial-ring" />
        </a>
      </Link>

      {React.Children.map(children, (child, index) => {
        if (!child) {
          return null;
        }

        const Child = React.cloneElement(child, {
          selected: index === React.Children.count(children) - 1,
        });

        return (
          <div
            className={clsx(
              'flex items-center whitespace-nowrap',
              size === 'large' && 'text-sm',
              size === 'medium' && 'text-sm',
              size === 'small' && 'text-xs'
            )}
          >
            <span className={clsx('text-gray-400 select-none font-light')}>
              {'/'}
            </span>
            {Child}
          </div>
        );
      })}
    </div>
  );
}

export type CrumbProps = {
  label: string;
  href: string;
  selected?: boolean;
};

const Crumb = (props: CrumbProps) => {
  const { label, href, selected } = props;

  return (
    <Link href={href}>
      <a className="no-underline">
        <div
          className={clsx(
            'flex items-center space-x-2 px-1 duration-300',
            selected ? 'text-dark' : 'text-gray-400 hover:text-dark'
          )}
        >
          {label}
        </div>
      </a>
    </Link>
  );
};

Breadcrumbs.Crumb = Crumb;
