import { Popover as HeadlessPopover, Transition } from '@headlessui/react';
import clsx from 'clsx';
import React, { ReactElement, ReactNode } from 'react';
import { Z_INDEX_MODAL_OVERLAY } from './Modal';
import { ComponentSize } from './types';

// Underneath modals
const Z_INDEX_POPOVER = Z_INDEX_MODAL_OVERLAY - 1;

type Alignment = 'left' | 'center' | 'right';
type PopoverAllowedChildren = PopoverPanelProps | PopoverTriggerProps;

enum DisplayNames {
  TRIGGER = 'Popover.Trigger',
  PANEL = 'Popover.Panel',
  DIVIDER = 'Popover.Divider',
}

export interface PopoverProps {
  size?: ComponentSize;
  align?: Alignment;

  /**
   * Allowed children:
   *    Popover.Panel
   *    Popover.Trigger <-- Custom trigger (no styling, just a wrapper)
   *    Popover.Divider
   */
  children?:
    | ReactElement<PopoverAllowedChildren>
    | ReactElement<PopoverAllowedChildren>[];
}

export function Popover(props: PopoverProps) {
  const { size = 'medium', align = 'left', children } = props;
  size;

  React.Children.forEach(children, (child) =>
    console.log('Popover ➡️ child:', (child?.type as any).displayName)
  );

  let trigger: ReactElement<PopoverTriggerProps> | null = null;
  React.Children.forEach(children, (child) => {
    if (!child) {
      return;
    }

    const displayName: DisplayNames = (child?.type as any).displayName;
    if (displayName === DisplayNames.TRIGGER) {
      trigger = child;
    }
  });

  // Get child elements inside the popover
  let panel: ReactElement<PopoverPanelProps> | null = null;
  React.Children.forEach(children, (child) => {
    const displayName: DisplayNames = (child?.type as any).displayName;
    if (!child) {
      return;
    }

    if (displayName === DisplayNames.PANEL) {
      panel = React.cloneElement(child, { align });
    }

    // if (displayName === DisplayNames.DIVIDER) {
    //   items.push(child);
    // }
  });

  return (
    <HeadlessPopover as="div" className="relative inline-block text-left">
      <div>{trigger}</div>

      <Transition
        as={'div'}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        {panel}
      </Transition>
    </HeadlessPopover>
  );
}

interface PopoverPanelProps {
  align?: Alignment;
  children: ReactNode;
}

const PopoverPanel = (props: PopoverPanelProps) => {
  const { children, align = 'right' } = props;

  return (
    <HeadlessPopover.Panel
      style={{
        zIndex: Z_INDEX_POPOVER,
        width: 'max-content',
        maxWidth: align === 'center' ? '32rem' : 'unset',
      }}
      className={clsx(
        'absolute w-56 mt-3 origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
        align === 'left' && 'right-0',
        align === 'center' && '-left-64 -right-64 mx-auto',
        align === 'right' && 'left-0'
      )}
    >
      <div className="px-4 py-4">{children}</div>
    </HeadlessPopover.Panel>
  );
};
PopoverPanel.displayName = DisplayNames.PANEL;

interface PopoverTriggerProps {
  children: ReactNode;
}

/** Used to make alternative or more custom triggers. */
const PopoverTrigger = ({ children }: PopoverTriggerProps) => {
  return (
    <HeadlessPopover.Button as="div" className="relative">
      {children}
    </HeadlessPopover.Button>
  );
};
PopoverTrigger.displayName = DisplayNames.TRIGGER;

// interface DropdownDividerProps {
//   size?: ComponentSize;
// }
// export const DropdownDivider = ({ size }: DropdownDividerProps) => {
//   return (
//     <hr
//       className={clsx(
//         '-mx-1 opacity-50 my-2',
//         (size === 'large' || size === 'medium') && 'my-2',
//         size === 'small' && 'my-1'
//       )}
//     />
//   );
// };
// DropdownDivider.displayName = DisplayNames.DIVIDER;

Popover.Panel = PopoverPanel;
Popover.Trigger = PopoverTrigger;
// Dropdown.Divider = PopoverDivider;
