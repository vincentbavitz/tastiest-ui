import {
  EditOutlined,
  FormatPainterOutlined,
  MergeCellsOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Button, Dropdown, DropdownProps } from '../src';

const meta: Meta = {
  title: 'Dropdown',
  component: Dropdown,
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

const Template: Story<DropdownProps> = (args) => (
  <div className="flex justify-center w-full">
    <Dropdown show={true} {...args}>
      <Dropdown.Trigger>
        <Button color="danger">Danger!</Button>
      </Dropdown.Trigger>

      <Dropdown.Item href="/" icon={<EditOutlined />}>
        Profile
      </Dropdown.Item>
      <Dropdown.Item icon={<SettingOutlined />}>Settings</Dropdown.Item>

      <Dropdown.Item disabled icon={<MergeCellsOutlined />}>
        Disabled
      </Dropdown.Item>

      <Dropdown.Divider />

      <Dropdown.Item theme="primary" icon={<FormatPainterOutlined />}>
        Primary
      </Dropdown.Item>

      <Dropdown.Item theme="secondary" icon={<FormatPainterOutlined />}>
        Secondary (default)
      </Dropdown.Item>

      <Dropdown.Item theme="success" icon={<FormatPainterOutlined />}>
        Success
      </Dropdown.Item>

      <Dropdown.Item theme="danger" icon={<FormatPainterOutlined />}>
        Danger
      </Dropdown.Item>

      <Dropdown.Divider />
      <Dropdown.Item icon={<UserOutlined />}>Sign out</Dropdown.Item>
    </Dropdown>
  </div>
);

export const Default = Template.bind({});
