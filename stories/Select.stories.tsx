import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Select, SelectProps } from '../src/Select';

const meta: Meta = {
  title: 'Select',
  component: Select,
  //   argTypes: {
  //     children: {
  //       control: {
  //         type: 'text',
  //       },
  //     },
  //   },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<SelectProps> = args => (
  <Select {...args}>
    <option>Option 1</option>
    <option>Option 2</option>
    <option>Option 3</option>
  </Select>
);

export const Default = Template.bind({});
Default.args = {};
