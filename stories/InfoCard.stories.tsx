import { Meta, Story } from '@storybook/react';
import React from 'react';
import { InfoCard, InfoCardProps } from '../src';

const meta: Meta = {
  title: 'InfoCard',
  component: InfoCard,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<InfoCardProps> = args => (
  <InfoCard
    label="Total Revenue"
    polyfillInfo={'£00.00'}
    info={'£33.00'}
    {...args}
  />
);

export const Default = Template.bind({});
Default.args = { children: 'Checkbox' };
