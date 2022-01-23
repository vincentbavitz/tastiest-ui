import clsx from 'clsx';
import Link from 'next/link';
import { NextRouter } from 'next/router';
import React, { cloneElement, FC, ReactElement } from 'react';
import { TastiestBrand } from '../TastiestBrand';
import { Tooltip } from '../Tooltip';

export interface SidebarProps {
  router: NextRouter;
  compact?: boolean;
  children: ReactElement<SidebarItemProps> | ReactElement<SidebarItemProps>[];
}

export const Sidebar = (props: SidebarProps) => {
  const { router, compact, children } = props;

  // Allow users to set compact
  // const [compact, setCompact] = useState(props.compact ?? false);
  // setCompact;

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
        <div className="flex justify-center pt-6 pb-6">
          <TastiestBrand theme="dark" type="initial-ring" />
        </div>

        {/* <div
          onClick={() => setCompact(!compact)}
          className={clsx(
            'absolute right-0 z-50 -bg-primary-1 flex items-center w-4 h-10',
            'shadow-md rounded-r-md',
            'transform translate-x-full top-6 cursor-pointer',
            'text-gray-300 hover:text-white'
          )}
        >
          {compact ? (
            <RightOutlined className="text-xs" />
          ) : (
            <LeftOutlined className="text-xs" />
          )}
        </div> */}

        <div className="relative flex flex-col flex-grow justify-between">
          <div>{top}</div>
          <div>{bottom}</div>
        </div>
      </div>
    </div>
  );
};

export interface SidebarItemProps {
  label: string;
  page: string;
  icon: FC<any>;
  float: 'top' | 'bottom';
  selected?: boolean;
  compact?: boolean;
  notifications?: { amount: number; urgency: 'high' | 'medium' | 'low' };
}

const Item = (props: SidebarItemProps) => {
  const { label, page, selected, compact, notifications } = props;

  const inner = (
    <Link href={page}>
      <a style={{ textDecoration: 'none' }}>
        <div
          className={clsx(
            'relative text-gray-400 duration-150 hover:text-primary py-4 filter',
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
            <div className="relative">
              <props.icon
                className={clsx('h-6 stroke-current w-6 text-xl fill-current')}
              />
              {notifications ? (
                <div
                  className={clsx(
                    'flex items-center justify-center z-50 absolute rounded-full w-5 h-5 font-mono text-xs',
                    compact ? '-right-5 -top-2' : '-right-6 -top-1',
                    notifications.urgency === 'high' && 'bg-red-600 font-bold',
                    notifications.urgency === 'medium' &&
                      'bg-yellow-300 text-dark',
                    notifications.urgency === 'low' && 'bg-secondary text-light'
                  )}
                >
                  {notifications.amount > 100 ? '99' : notifications.amount}
                </div>
              ) : null}
            </div>

            {!compact && <p className={clsx()}>{label}</p>}
          </div>
        </div>
      </a>
    </Link>
  );

  return compact ? (
    <Tooltip placement="right" content={label}>
      {inner}
    </Tooltip>
  ) : (
    <>{inner}</>
  );
};

Sidebar.Item = Item;
