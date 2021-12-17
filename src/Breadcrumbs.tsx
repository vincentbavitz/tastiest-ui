import clsx from 'clsx';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { TastiestBrand } from './TastiestBrand';

export interface BreadcrumbsProps {
  children: ReactElement<CrumbProps> | ReactElement<CrumbProps>[];
}

/**
 * The default behaviour is to make the last child unselected
 * as the "current page". You can override this behaviour by passing
 * `selected` as individual props to your crumbs.
 */
export function Breadcrumbs(props: BreadcrumbsProps) {
  const { children } = props;

  return (
    <div className="flex space-x-1 items-center flex-nowrap">
      <Link href="/">
        <a className="no-underline">
          <TastiestBrand size={6} type="initial-ring" />
        </a>
      </Link>

      {React.Children.map(children, (child, index) => {
        const Child = React.cloneElement(child, {
          selected: index === React.Children.count(children) - 1,
        });

        return (
          <div className="flex items-center">
            <span className="mx-1 text-gray-400 select-none font-light text-sm">
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
            'flex items-center space-x-2 tex-lg px-2 duration-300',
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
