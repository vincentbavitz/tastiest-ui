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
      <Select
        {...args}
        onSelect={(id, value) => alert(`id: ${id}, value: ${value}`)}
      >
        <Select.Option id="vincent" value="Vincent" />
        <Select.Option id="daniel" value="Daniel" />
        <Select.Option id="william" value="William" />
        <Select.Option id="hawking" disabled value="Stephen Hawking" />
      </Select>
    </div>
  </div>
);

export const Default = Template.bind({});
export const InitialSelected = Template.bind({});

InitialSelected.args = { initialSelected: 'hawking' };
Default.args = {};
