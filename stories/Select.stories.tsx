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

const TinyTemplate: Story<SelectProps> = (args) => (
  <div className="inset-0 absolute bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-500">
    <div className="pt-16 ml-16">
      <div className="flex space-x-2 text-dark">
        <Select minSelectWidth={100} minOptionWidth={200} onSelect={() => null}>
          <Select.Option id="1" value="1" />
          <Select.Option id="2" value="2" />
          <Select.Option id="3" value="3" />
          <Select.Option id="4" value="4" />
          <Select.Option id="5" value="5" />
          <Select.Option id="6" value="6" />
          <Select.Option id="7" value="7" />
        </Select>

        <Select onSelect={() => null}>
          <Select.Option id="1" value="January" />
          <Select.Option id="2" value="February" />
          <Select.Option id="3" value="March" />
          <Select.Option id="4" value="April" />
          <Select.Option id="5" value="May" />
          <Select.Option id="6" value="June" />
          <Select.Option id="7" value="July" />
          <Select.Option id="8" value="August" />
          <Select.Option id="9" value="September" />
          <Select.Option id="10" value="October" />
          <Select.Option id="11" value="November" />
          <Select.Option id="12" value="December" />
        </Select>

        <Select onSelect={() => null}>
          {Array(200)
            .fill(null)
            .map((_, n) => (
              <Select.Option key={n} id="1" value={String(n)} />
            ))}
        </Select>
      </div>
    </div>
  </div>
);

export const Default = Template.bind({});
export const WithTinyInput = TinyTemplate.bind({});
export const InitialSelected = Template.bind({});

InitialSelected.args = { initialSelected: 'hawking' };
WithTinyInput.args = {};
Default.args = {};
