import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Button, Popover } from '../src';

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

const Template: Story = (args) => (
  <div className="pt-20 pl-48 relative">
    <Popover {...args}>
      <Popover.Trigger>
        <Button>Trigger</Button>
      </Popover.Trigger>
      <Popover.Panel>Very big and long popover</Popover.Panel>
    </Popover>
  </div>
);

export const Default = Template.bind({});
Default.args = {};
