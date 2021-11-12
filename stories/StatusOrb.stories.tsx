import { Meta, Story } from '@storybook/react';
import React from 'react';
import { StatusOrb, StatusOrbProps } from '../src/StatusOrb';

const meta: Meta = {
  title: 'StatusOrb',
  component: StatusOrb,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<StatusOrbProps> = (args) => (
  <div>
    <p>
      <StatusOrb {...args} /> Status
    </p>
  </div>
);

export const Online = Template.bind({});
Online.args = { status: 'online' };

export const Warning = Template.bind({});
Warning.args = { status: 'warning' };

export const Offline = Template.bind({});
Offline.args = { status: 'offline' };

export const WarningWithPing = Template.bind({});
WarningWithPing.args = { status: 'warning', ping: true };
