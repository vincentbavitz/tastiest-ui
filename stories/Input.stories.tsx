import {
  RightOutlined,
  SearchOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
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

const Template: Story<InputProps> = args => (
  <div style={{ maxWidth: '30rem' }} className="mt-10">
    <Input {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};

export const Validated = Template.bind({});
Validated.args = { error: 'Invalid username' };

export const BellsAndWhistles = Template.bind({});
BellsAndWhistles.args = {
  label: 'Label',
  subLabel: <UserAddOutlined />,
  prefix: <SearchOutlined />,
  suffix: <RightOutlined />,
};
