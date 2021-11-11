import clsx from 'clsx';
import { NextRouter } from 'next/router';
import React, { cloneElement, ReactElement } from 'react';
import { TastiestBrand } from '../TastiestBrand';
import { SidebarItemProps } from './SidebarItem';

export interface SidebarProps {
  router: NextRouter;
  children: ReactElement<SidebarItemProps>[];
  compact?: boolean;
}

export const Sidebar = (props: SidebarProps) => {
  const { router, compact = false, children } = props;

  const elements = React.Children.map(children, (child) => {
    const selected =
      router.pathname.split('/')?.[1] === child.props.page.replace(/\//g, '');

    return cloneElement(child, {
      compact,
      selected,
    });
  });

  const top = elements.filter((item) => item.props.float === 'top');
  const bottom = elements.filter((item) => item.props.float === 'bottom');

  return (
    <div className="relative h-full">
      <div
        style={{ width: 'fit-content' }}
        className={clsx(
          'flex flex-col h-full duration-300 bg-primary text-light',
          'relative'
        )}
      >
        <div className="flex justify-center pt-4 pb-6">
          <TastiestBrand theme="dark" type="initial-ring" />
        </div>

        <div className="flex flex-col flex-grow justify-between">
          {/* <div
              onClick={() => toggleCollapsed()}
              className={clsx(
                'absolute right-0 z-50 bg-white flex items-center w-4 h-10',
                'border-t-2 border-b-2 border-r-2 border-gray-300 rounded-r-md',
                'transform translate-x-full top-3 cursor-pointer',
              )}
            >
              {collapsed ? (
                <RightOutlined className="text-sm text-gray-500" />
              ) : (
                <LeftOutlined className="text-sm text-gray-500" />
              )}
            </div> */}

          <div>{top}</div>
          <div>{bottom}</div>
        </div>
      </div>
    </div>
  );
};
