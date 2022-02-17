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

const Template: Story<TextAreaProps> = (args) => (
  <div className="pt-12">
    <TextArea {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  label: 'Textarea Label',
  rows: 5,
  error: 'Some error',
};
