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

const Template: Story<SelectProps> = (args) => (
  <div className="inset-0 absolute bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-500">
    <div className="w-72 pt-16 ml-16">
      <Select {...args}>
        <Select.Option key={1} id="vincent" value="Vincent" />
        <Select.Option key={2} id="daniel" value="Daniel" />
        <Select.Option key={3} id="william" value="William" />
        <Select.Option key={4} id="hawking" disabled value="Stephen Hawking" />
      </Select>
    </div>
  </div>
);

export const Default = Template.bind({});
Default.args = {};
