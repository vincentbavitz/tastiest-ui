import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Tooltip, TooltipProps } from '../src';

const meta: Meta = {
  title: 'Tooltip',
  component: Tooltip,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<TooltipProps> = args => (
  <div className="mt-32 ml-32">
    <div className="flex">
      <Tooltip {...args}>
        <div className="w-10 h-10 bg-gray-800"></div>
      </Tooltip>
    </div>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  trigger: 'hover',
  content: 'This is some tooltip content!',
  placement: 'top-left',
  children: <></>,
};
