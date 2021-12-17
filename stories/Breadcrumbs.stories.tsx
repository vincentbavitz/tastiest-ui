import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Breadcrumbs, BreadcrumbsProps } from '../src/Breadcrumbs';

const meta: Meta = {
  title: 'Breadcrumbs',
  component: Breadcrumbs,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<BreadcrumbsProps> = (args) => (
  <Breadcrumbs {...args}>
    <Breadcrumbs.Crumb href="/" label="Restaurants" />
    <Breadcrumbs.Crumb href="/" label="El Vaquero" />
    <Breadcrumbs.Crumb href="/" label="Experiences" />
  </Breadcrumbs>
);

export const Default = Template.bind({});
Default.args = {};
