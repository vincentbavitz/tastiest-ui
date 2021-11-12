import { DownOutlined } from '@ant-design/icons';
import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import Link from 'next/link';
import React, { Fragment, ReactElement, ReactNode, useMemo } from 'react';
import { Button } from '.';

type DropdownAllowedChildren =
  | DropdownItemProps
  | DropdownButtonProps
  | DropdownTriggerProps;

enum DisplayNames {
  ITEM = 'DropdownItem',
  BUTTON = 'DropdownButton',
  TRIGGER = 'DropdownTrigger',
  DIVIDER = 'DropdownDivider',
}

export interface DropdownProps {
  show: boolean;

  /**
   * Allowed children:
   *    Dropdown.Item
   *    Dropdown.Button <-- Default trigger
   *    Dropdown.Trigger <-- Custom trigger (no styling, just a wrapper)
   *    Dropdown.Divider
   */
  children?:
    | ReactElement<DropdownAllowedChildren>
    | ReactElement<DropdownAllowedChildren>[];
}

export function Dropdown(props: DropdownProps) {
  const { children } = props;

  // Get the trigger element. It's either Dropdown.Button or Dropdown.Trigger
  let trigger: ReactElement<
    DropdownButtonProps | DropdownTriggerProps
  > | null = null;

  React.Children.forEach(children, (child) => {
    const displayName: DisplayNames = (child?.type as any).displayName;
    console.log('Dropdown ➡️ displayName:', displayName);

    // prettier-ignore
    if (child && (displayName === DisplayNames.TRIGGER || displayName === DisplayNames.BUTTON)) {
     trigger = child;
   }
  });

  // Get child elements inside the dropdown
  const items: ReactElement<DropdownItemProps | DropdownDividerProps>[] = [];
  React.Children.forEach(children, (child) => {
    const displayName: DisplayNames = (child?.type as any).displayName;
    console.log('Dropdown ➡️ displayName:', displayName);

    // prettier-ignore
    if (child && (displayName === DisplayNames.ITEM || displayName === DisplayNames.DIVIDER)) {
     items.push(child);
   }
  });

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>{trigger}</div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">{items}</div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export interface DropdownButtonProps {
  children: ReactNode;
}

/** The default dropdown trigger button */
export const DropdownButton = ({ children }: DropdownButtonProps) => (
  <Button suffix={<DownOutlined className="text-xs mt-px pt-px" />}>
    {children}
  </Button>
);
DropdownButton.displayName = DisplayNames.BUTTON;

export interface DropdownTriggerProps {
  children: ReactNode;
}

/** Used to make alternative or more custom triggers. */
export const DropdownTrigger = ({ children }: DropdownTriggerProps) => {
  return (
    <Menu.Button as="div" className="relative">
      {children}
    </Menu.Button>
  );
};
DropdownTrigger.displayName = DisplayNames.TRIGGER;

interface DropdownDividerProps {}
export const DropdownDivider = () => {
  return <hr className="-mx-1 opacity-50 my-2" />;
};
DropdownDivider.displayName = DisplayNames.DIVIDER;

export interface DropdownItemProps {
  theme?: 'primary' | 'secondary' | 'danger' | 'success';
  href?: string;
  icon?: ReactElement;
  disabled?: boolean;
  children: ReactNode;
  onClick?: () => void;
}

export const DropdownItem = (props: DropdownItemProps) => {
  const {
    theme = 'secondary',
    href,
    icon,
    disabled,
    onClick,
    children,
  } = props;

  console.log('Dropdown ➡️ disabled:', disabled);

  // prettier-ignore
  const iconColor = 
    theme === 'primary' ? 'blue-200' :
    theme === 'secondary' ? 'blue-100' :
    theme === 'success' ? 'green-100' :
    theme === 'danger' ? 'pink-100' : '';

  const Inner = useMemo(
    () => () => (
      <Menu.Item disabled={disabled}>
        {({ active, disabled }) => (
          <button
            onClick={disabled ? () => null : onClick}
            className={clsx(
              active && !disabled ? `bg-${theme} text-white` : 'text-gray-900',
              disabled ? 'opacity-75 pointer-events-none cursor-default' : '',
              'group flex rounded-md items-center w-full px-2 py-2 text-sm select-none'
            )}
          >
            {icon ? (
              <div
                className={clsx(
                  'relative text-lg w-5 h-5 mr-2 overflow-hidden flex items-center justify-center',
                  active ? iconColor : `text-${theme}`
                )}
              >
                {icon}
              </div>
            ) : null}

            <div>{children}</div>
          </button>
        )}
      </Menu.Item>
    ),
    [props]
  );

  return href && !disabled ? (
    <Link href={href}>
      <a>
        <Inner />
      </a>
    </Link>
  ) : (
    <Inner />
  );
};
DropdownItem.displayName = DisplayNames.ITEM;

Dropdown.Item = DropdownItem;
Dropdown.Button = DropdownButton;
Dropdown.Trigger = DropdownTrigger;
Dropdown.Divider = DropdownDivider;
