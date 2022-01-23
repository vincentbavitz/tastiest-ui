import {
  ClockCircleOutlined,
  SettingOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { Meta, Story } from '@storybook/react';
import { HomeIcon, SupportIcon } from '@tastiest-io/tastiest-icons';
import { NextRouter } from 'next/router';
import React from 'react';
import { Sidebar, SidebarProps } from '../src/dashboard';

const meta: Meta = {
  title: 'Sidebar',
  component: Sidebar,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const router: NextRouter = {
  pathname: 'localhost:3000/',
} as NextRouter;

const Template: Story<SidebarProps> = (args) => (
  <div style={{ height: '600px' }}>
    <Sidebar router={router} {...args}>
      <Sidebar.Item label="Home" page="/" icon={HomeIcon} float="top" />
      <Sidebar.Item
        label="Slots"
        page="/slots"
        icon={ClockCircleOutlined}
        float="top"
      />
      <Sidebar.Item
        label="Followers"
        page="/followers"
        icon={WalletOutlined}
        float="bottom"
      />
      <Sidebar.Item
        label="Billing"
        page="/billing"
        icon={WalletOutlined}
        notifications={{ amount: 1337, urgency: 'low' }}
        float="top"
      />
      <Sidebar.Item
        label="Support"
        page="/support"
        icon={SupportIcon}
        notifications={{ amount: 50, urgency: 'high' }}
        float="bottom"
      />
      <Sidebar.Item
        label="Settings"
        page="/settings"
        icon={SettingOutlined}
        notifications={{ amount: 1, urgency: 'medium' }}
        float="bottom"
      />
    </Sidebar>
  </div>
);

export const Default = Template.bind({});
Default.args = {};
