import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ReactTableMui, Props } from '../src';

const meta: Meta = {
  title: 'Welcome',
  component: ReactTableMui,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<Props> = (args) => <ReactTableMui {...args} />;

export const Default = Template.bind({});

Default.args = {
  data: [
    {
      col1: 'Hello',
      col2: 'World',
    },
    {
      col1: 'react-table',
      col2: 'rocks',
    },
    {
      col1: 'whatever',
      col2: 'you want',
    },
  ],

  columns: [
    {
      Header: 'Column 1',
      accessor: 'col1', // accessor is the "key" in the data
    },
    {
      Header: 'Column 2',
      accessor: 'col2',
    },
  ],
};
