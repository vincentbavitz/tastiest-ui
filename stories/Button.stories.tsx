import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Button, ButtonProps } from '../src';

const meta: Meta = {
  title: 'Button',
  component: Button,
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

const Template: Story<ButtonProps> = (args) => (
  <Button {...args}>{args.children}</Button>
);

export const Default = Template.bind({});
Default.args = { children: 'Button' };

export const Large = Template.bind({});
Large.args = { size: 'large', children: 'Button', type: 'solid' };

export const Small = Template.bind({});
Small.args = { size: 'small', children: 'Button' };

export const Wide = Template.bind({});
Wide.args = { children: 'Button', wide: true };
