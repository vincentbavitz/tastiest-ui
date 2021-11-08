import { Meta, Story } from '@storybook/react';
import React from 'react';
import { TextArea, TextAreaProps } from '../src/TextArea';

const meta: Meta = {
  title: 'TextArea',
  component: TextArea,
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

const Template: Story<TextAreaProps> = args => <TextArea {...args} />;

export const Default = Template.bind({});
Default.args = {};
