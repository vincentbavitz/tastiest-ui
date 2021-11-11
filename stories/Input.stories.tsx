import { RightOutlined, SearchOutlined } from '@ant-design/icons';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Input, InputProps } from '../src/Input';

const meta: Meta = {
  title: 'Input',
  component: Input,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<InputProps> = (args) => (
  <div className="bg-white">
    <div>
      <div>
        <div>
          <div
            style={{ maxWidth: '30rem' }}
            className="flex items-center px-10 w-64 h-20 mt-10"
          >
            <Input label="Input" {...args} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const Default = Template.bind({});
Default.args = {};

export const ReadOnly = Template.bind({});
ReadOnly.args = { readOnly: true };

export const Validated = Template.bind({});
Validated.args = { error: 'Invalid username' };

export const BellsAndWhistles = Template.bind({});
BellsAndWhistles.args = {
  label: 'Label',
  prefix: <SearchOutlined />,
  suffix: <RightOutlined />,
};
