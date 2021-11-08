import { Meta, Story } from '@storybook/react';
import React from 'react';
import { TastiestBrand, TastiestBrandProps } from '../src';

const meta: Meta = {
  title: 'TastiestBrand',
  component: TastiestBrand,
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

const Template: Story<TastiestBrandProps> = (args) => (
  <TastiestBrand {...args} />
);

export const Default = Template.bind({});
// Default.args = { children: 'Button' };
