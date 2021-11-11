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
export const ReadOnly = Template.bind({});
export const Validated = Template.bind({});
export const BellsAndWhistles = Template.bind({});
export const WithoutLabel = Template.bind({});

export const Large = Template.bind({});
export const Medium = Template.bind({});
export const Small = Template.bind({});

Default.args = {};
ReadOnly.args = { readOnly: true };
Validated.args = { error: 'Invalid username' };
BellsAndWhistles.args = {
  label: 'Label',
  prefix: <SearchOutlined />,
  suffix: <RightOutlined />,
};

WithoutLabel.args = {
  label: undefined,
};

Large.args = { size: 'large' };
Medium.args = { size: 'medium' };
Small.args = { size: 'small' };
