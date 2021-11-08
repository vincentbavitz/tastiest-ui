import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Dropdown, DropdownItem, DropdownProps } from '../src';

const meta: Meta = {
  title: 'Dropdown',
  component: Dropdown,
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

const Template: Story<DropdownProps> = args => (
  <div className="flex justify-center w-full">
    <div className="">
      <div className="w-8 h-8 rounded-md bg-primary">x</div>
      <Dropdown isOpen={true} {...args}>
        {args.children}
      </Dropdown>
    </div>
  </div>
);

const defaultChildren = (
  <>
    <DropdownItem id="option-1" center>
      Centered
    </DropdownItem>
    <DropdownItem id="option-2">Option 1</DropdownItem>
    <DropdownItem id="option-3">Option 1</DropdownItem>
    <DropdownItem id="option-4">Option 1</DropdownItem>
  </>
);

export const Default = Template.bind({});
Default.args = { children: defaultChildren };

export const Right = Template.bind({});
Right.args = { pull: 'right', children: defaultChildren };

export const Left = Template.bind({});
Left.args = { pull: 'left', children: defaultChildren };

export const Center = Template.bind({});
Center.args = { pull: 'center', children: defaultChildren };
