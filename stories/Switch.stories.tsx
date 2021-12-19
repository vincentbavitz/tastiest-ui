import { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import { Switch, SwitchProps } from '../src/Switch';

const meta: Meta = {
  title: 'Switch',
  component: Switch,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<SwitchProps> = (args) => {
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <Switch {...args} checked={checked} onChange={setChecked} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
