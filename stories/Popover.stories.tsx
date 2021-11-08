import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Popover } from '../src';

const meta: Meta = {
  title: 'Popover',
  component: Popover,
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

const Template: Story = (args) => <Popover {...args}>{args.children}</Popover>;

export const Default = Template.bind({});
// Default.args = { ' };
