import { Meta, Story } from '@storybook/react';
import React from 'react';
import { RangeSliderProps } from 'rsuite';
import { RangeSlider } from '../src';

const meta: Meta = {
  title: 'RangeSlider',
  component: RangeSlider,
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

const Template: Story<RangeSliderProps> = (args) => (
  <RangeSlider defaultValue={[0, 33]} tooltip={false} {...args} />
);

export const Default = Template.bind({});
