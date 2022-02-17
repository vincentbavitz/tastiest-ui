import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Button } from '../src/Button';
import { Tooltip, TooltipProps } from '../src/Tooltip';

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

const Template: Story<TooltipProps> = (args) => {
  return (
    <div className="ml-64 mt-20">
      <Tooltip trigger="hover" {...args}>
        <Button>Hover me</Button>
      </Tooltip>
    </div>
  );
};

const TinyChildrenTemplate: Story<TooltipProps> = (args) => {
  return (
    <div className="ml-64 mt-20">
      <div className="relative w-0 h-0">
        <Tooltip trigger="hover" {...args}>
          <Button>Hover me</Button>
        </Tooltip>
      </div>
    </div>
  );
};

export const Top = Template.bind({});
export const Left = Template.bind({});
export const Right = Template.bind({});
export const Bottom = Template.bind({});
export const ManualShow = Template.bind({});
export const WithTimeout = Template.bind({});
export const WithTinyChildren = TinyChildrenTemplate.bind({});

Top.args = {
  trigger: 'hover',
  content: 'This is some tooltip content!',
  placement: 'top',
};

Left.args = {
  trigger: 'hover',
  content: 'This is some tooltip content!',
  placement: 'left',
};

Right.args = {
  trigger: 'hover',
  content: 'This is some tooltip content!',
  placement: 'right',
};

Bottom.args = {
  trigger: 'hover',
  content: 'This is some tooltip content!',
  placement: 'bottom',
};

ManualShow.args = {
  trigger: 'manual',
  show: true,
  content: 'This is some manual content!',
  placement: 'bottom',
};

WithTinyChildren.args = {
  trigger: 'manual',
  show: true,
  content: 'I have tiny children',
  placement: 'top-end',
};

WithTimeout.args = {
  trigger: 'manual',
  show: true,
  content: 'This will disappear after a timeout',
  placement: 'bottom',
  hideDelay: 1500,
};
