import { Popover as HeadlessPopover } from '@headlessui/react';
import React, { FC } from 'react';

export const Popover: FC = () => {
  return (
    <HeadlessPopover className="relative">
      <HeadlessPopover.Button>Solutions</HeadlessPopover.Button>

      <HeadlessPopover.Panel className="bg-blue-400 shadow-lg py-2 px-4 rounded-lg absolute z-10">
        <div className="grid grid-cols-2">
          <a href="/analytics">Analytics</a>
          <a href="/engagement">Engagement</a>
          <a href="/security">Security</a>
          <a href="/integrations">Integrations</a>
        </div>

        <img src="/solutions.jpg" alt="" />
      </HeadlessPopover.Panel>
    </HeadlessPopover>
  );
};
