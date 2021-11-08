import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Checkbox, CheckboxProps } from '../src';

const meta: Meta = {
  title: 'Checkbox',
  component: Checkbox,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<CheckboxProps> = args => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = { children: 'Checkbox' };
