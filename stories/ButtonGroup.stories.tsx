import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Button } from '../src/Button';
import { ButtonGroup, ButtonGroupProps } from '../src/ButtonGroup';

const meta: Meta = {
  title: 'ButtonGroup',
  component: ButtonGroup,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<ButtonGroupProps> = (args) => (
  <ButtonGroup {...args}>
    <Button>1</Button>
    <Button>2</Button>
    <Button>3</Button>
  </ButtonGroup>
);

export const Default = Template.bind({});
Default.args = {};
