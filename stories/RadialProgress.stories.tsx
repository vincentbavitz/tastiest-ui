import { Meta, Story } from '@storybook/react';
import React from 'react';
import { RadialProgress, RadialProgressProps } from '../src';

const meta: Meta = {
  title: 'RadialProgress',
  component: RadialProgress,
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

const Template: Story<RadialProgressProps> = (args) => (
  <div className="w-32 h-32">
    <RadialProgress pc={33} {...args} />
  </div>
);

export const Default = Template.bind({});
