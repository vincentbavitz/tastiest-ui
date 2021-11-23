import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Avatar, AvatarProps } from '../src';

const meta: Meta = {
  title: 'Avatar',
  component: Avatar,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<AvatarProps> = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Initial = Template.bind({});
Initial.args = { initial: 'V' };

export const Image = Template.bind({});
Image.args = {
  imageSrc: 'https://avatars.githubusercontent.com/u/58160433?v=4',
};
