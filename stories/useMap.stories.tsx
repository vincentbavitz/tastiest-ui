import { Meta, Story } from '@storybook/react';
import React from 'react';
import { useMap } from '../src/hooks/useMap';

const meta: Meta = {
  title: 'useMap',
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

const Template: Story = (args) => {
  useMap(
    'map',
    {
      lat: 51,
      lng: 1,
      zoom: 12,
      pitch: 0,
    },
    {
      accessToken: `pk.eyJ1IjoidGFzdGllc3R2aW5jZSIsImEiOiJja2VnaXp0bzkwZWM0MzJxYng3OW9qZnY5In0.xA1wKv2WJEZUU9XvdlolLg`,
      styleId: 'ckj6mv0zb04uz1amskq1bpi3u',
    }
  );

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-blue-200">
      <div
        id="map"
        style={{ width: '500px', height: '400px' }}
        className="shadow-lg rounded-lg"
      ></div>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
