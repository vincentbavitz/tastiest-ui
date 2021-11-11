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

const Template: Story<TooltipProps> = (args) => (
  <div className="ml-64 mt-20">
    <Tooltip trigger="hover" {...args}>
      <Button>Hover me</Button>
    </Tooltip>
  </div>
);

export const Top = Template.bind({});
export const Left = Template.bind({});
export const Right = Template.bind({});
export const Bottom = Template.bind({});
export const ManualShow = Template.bind({});

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
