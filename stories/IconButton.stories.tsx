import {
  CheckOutlined,
  CloseOutlined,
  RightOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { IconButton, IconButtonProps } from '../src/IconButton';

const meta: Meta = {
  title: 'IconButton',
  component: IconButton,
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

const Template: Story<IconButtonProps> = (args) => <IconButton {...args} />;

export const Primary = Template.bind({});
Primary.args = { icon: RightOutlined, theme: 'primary' };

export const Secondary = Template.bind({});
Secondary.args = { icon: WalletOutlined, theme: 'secondary' };

export const Danger = Template.bind({});
Danger.args = { icon: CloseOutlined, theme: 'danger' };

export const Success = Template.bind({});
Success.args = { icon: CheckOutlined, theme: 'success' };
