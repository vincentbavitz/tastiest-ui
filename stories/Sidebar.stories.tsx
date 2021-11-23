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
        float="top"
      />
      <Sidebar.Item
        label="Support"
        page="/support"
        icon={SupportIcon}
        float="bottom"
      />
      <Sidebar.Item
        label="Settings"
        page="/settings"
        icon={SettingOutlined}
        float="bottom"
      />
    </Sidebar>
  </div>
);

export const Default = Template.bind({});
Default.args = {};
