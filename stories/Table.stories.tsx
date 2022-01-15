import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ReactTableMui, ReactMuiTableProps } from '../src';

const meta: Meta = {
  title: 'ReactTableMui',
  component: ReactTableMui,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<ReactMuiTableProps> = (args) => (
  <ReactTableMui {...args} />
);

export const Simple = Template.bind({});

Simple.args = {
  columns: [
    {
      Header: 'Column 1',
      accessor: 'col1',
    },
    {
      Header: 'Column 2',
      accessor: 'col2',
    },
  ],
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
};

export const HeaderGroups = Template.bind({});

HeaderGroups.args = {
  columns: [
    {
      Header: 'Name',
      columns: [
        {
          Header: 'First Name',
          accessor: 'firstName',
        },
        {
          Header: 'Last Name',
          accessor: 'lastName',
        },
      ],
    },
    {
      Header: 'Info',
      columns: [
        {
          Header: 'Age',
          accessor: 'age',
        },
        {
          Header: 'Visits',
          accessor: 'visits',
        },
        {
          Header: 'Status',
          accessor: 'status',
        },
        {
          Header: 'Profile Progress',
          accessor: 'progress',
        },
      ],
    },
  ],
  data: [
    {
      firstName: 'boot',
      lastName: 'look',
      age: 26,
      visits: 66,
      progress: 42,
      status: 'single',
    },
    {
      firstName: 'place',
      lastName: 'blow',
      age: 0,
      visits: 13,
      progress: 81,
      status: 'single',
    },
    {
      firstName: 'clock',
      lastName: 'wealth',
      age: 9,
      visits: 29,
      progress: 83,
      status: 'complicated',
    },
    {
      firstName: 'market',
      lastName: 'place',
      age: 26,
      visits: 59,
      progress: 73,
      status: 'single',
    },
    {
      firstName: 'sky',
      lastName: 'dress',
      age: 6,
      visits: 71,
      progress: 69,
      status: 'relationship',
    },
    {
      firstName: 'cast',
      lastName: 'girlfriend',
      age: 1,
      visits: 88,
      progress: 73,
      status: 'single',
    },
    {
      firstName: 'screw',
      lastName: 'buyer',
      age: 9,
      visits: 25,
      progress: 24,
      status: 'complicated',
    },
    {
      firstName: 'cows',
      lastName: 'cracker',
      age: 9,
      visits: 60,
      progress: 49,
      status: 'complicated',
    },
    {
      firstName: 'chair',
      lastName: 'skill',
      age: 21,
      visits: 61,
      progress: 87,
      status: 'complicated',
    },
    {
      firstName: 'size',
      lastName: 'wood',
      age: 11,
      visits: 76,
      progress: 98,
      status: 'complicated',
    },
    {
      firstName: 'order',
      lastName: 'vegetable',
      age: 29,
      visits: 33,
      progress: 49,
      status: 'relationship',
    },
    {
      firstName: 'injury',
      lastName: 'faucet',
      age: 17,
      visits: 10,
      progress: 46,
      status: 'complicated',
    },
    {
      firstName: 'pump',
      lastName: 'meaning',
      age: 26,
      visits: 82,
      progress: 79,
      status: 'single',
    },
    {
      firstName: 'lace',
      lastName: 'permission',
      age: 20,
      visits: 43,
      progress: 16,
      status: 'relationship',
    },
    {
      firstName: 'rest',
      lastName: 'bushes',
      age: 7,
      visits: 10,
      progress: 87,
      status: 'single',
    },
    {
      firstName: 'selection',
      lastName: 'employer',
      age: 4,
      visits: 75,
      progress: 78,
      status: 'single',
    },
    {
      firstName: 'playground',
      lastName: 'growth',
      age: 16,
      visits: 91,
      progress: 26,
      status: 'complicated',
    },
    {
      firstName: 'disk',
      lastName: 'chairs',
      age: 1,
      visits: 74,
      progress: 20,
      status: 'relationship',
    },
    {
      firstName: 'button',
      lastName: 'boot',
      age: 15,
      visits: 21,
      progress: 46,
      status: 'complicated',
    },
    {
      firstName: 'street',
      lastName: 'surprise',
      age: 14,
      visits: 50,
      progress: 41,
      status: 'single',
    },
  ],
};

export const FooterGroups = Template.bind({});

FooterGroups.args = {
  columns: [
    {
      Header: 'Name',
      Footer: 'Name',
      columns: [
        {
          Header: 'First Name',
          Footer: 'First Name',
          accessor: 'firstName',
        },
        {
          Header: 'Last Name',
          Footer: 'Last Name',
          accessor: 'lastName',
        },
      ],
    },
    {
      Header: 'Info',
      Footer: 'Info',
      columns: [
        {
          Header: 'Age',
          Footer: 'Age',
          accessor: 'age',
        },
        {
          Header: 'Visits',
          Footer: 'Visits',
          accessor: 'visits',
        },
        {
          Header: 'Status',
          Footer: 'Status',
          accessor: 'status',
        },
        {
          Header: 'Profile Progress',
          Footer: 'Profile Progress',
          accessor: 'progress',
        },
      ],
    },
  ],
  data: [
    {
      firstName: 'boot',
      lastName: 'look',
      age: 26,
      visits: 66,
      progress: 42,
      status: 'single',
    },
    {
      firstName: 'place',
      lastName: 'blow',
      age: 0,
      visits: 13,
      progress: 81,
      status: 'single',
    },
    {
      firstName: 'clock',
      lastName: 'wealth',
      age: 9,
      visits: 29,
      progress: 83,
      status: 'complicated',
    },
    {
      firstName: 'market',
      lastName: 'place',
      age: 26,
      visits: 59,
      progress: 73,
      status: 'single',
    },
    {
      firstName: 'sky',
      lastName: 'dress',
      age: 6,
      visits: 71,
      progress: 69,
      status: 'relationship',
    },
    {
      firstName: 'cast',
      lastName: 'girlfriend',
      age: 1,
      visits: 88,
      progress: 73,
      status: 'single',
    },
    {
      firstName: 'screw',
      lastName: 'buyer',
      age: 9,
      visits: 25,
      progress: 24,
      status: 'complicated',
    },
    {
      firstName: 'cows',
      lastName: 'cracker',
      age: 9,
      visits: 60,
      progress: 49,
      status: 'complicated',
    },
    {
      firstName: 'chair',
      lastName: 'skill',
      age: 21,
      visits: 61,
      progress: 87,
      status: 'complicated',
    },
    {
      firstName: 'size',
      lastName: 'wood',
      age: 11,
      visits: 76,
      progress: 98,
      status: 'complicated',
    },
    {
      firstName: 'order',
      lastName: 'vegetable',
      age: 29,
      visits: 33,
      progress: 49,
      status: 'relationship',
    },
    {
      firstName: 'injury',
      lastName: 'faucet',
      age: 17,
      visits: 10,
      progress: 46,
      status: 'complicated',
    },
    {
      firstName: 'pump',
      lastName: 'meaning',
      age: 26,
      visits: 82,
      progress: 79,
      status: 'single',
    },
    {
      firstName: 'lace',
      lastName: 'permission',
      age: 20,
      visits: 43,
      progress: 16,
      status: 'relationship',
    },
    {
      firstName: 'rest',
      lastName: 'bushes',
      age: 7,
      visits: 10,
      progress: 87,
      status: 'single',
    },
    {
      firstName: 'selection',
      lastName: 'employer',
      age: 4,
      visits: 75,
      progress: 78,
      status: 'single',
    },
    {
      firstName: 'playground',
      lastName: 'growth',
      age: 16,
      visits: 91,
      progress: 26,
      status: 'complicated',
    },
    {
      firstName: 'disk',
      lastName: 'chairs',
      age: 1,
      visits: 74,
      progress: 20,
      status: 'relationship',
    },
    {
      firstName: 'button',
      lastName: 'boot',
      age: 15,
      visits: 21,
      progress: 46,
      status: 'complicated',
    },
    {
      firstName: 'street',
      lastName: 'surprise',
      age: 14,
      visits: 50,
      progress: 41,
      status: 'single',
    },
  ],
};
