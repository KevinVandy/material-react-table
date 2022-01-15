import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ReactTableMui, ReactTableMuiProps } from '../src';
import faker from '@faker-js/faker';

const meta: Meta = {
  title: 'ReactTableMui',
  component: ReactTableMui,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<ReactTableMuiProps> = (args) => (
  <ReactTableMui {...args} />
);

export const Simple = Template.bind({});

Simple.args = {
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
  data: [...Array(5)].map((_) => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  })),
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
          Header: 'Profile Progress',
          accessor: 'progress',
        },
      ],
    },
  ],
  data: [...Array(12)].map((_) => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.datatype.number(100),
    visits: faker.datatype.number(50),
    progress: faker.datatype.number(100),
  })),
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
          Header: 'Profile Progress',
          Footer: 'Profile Progress',
          accessor: 'progress',
        },
      ],
    },
  ],
  data: [...Array(12)].map((_) => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.datatype.number(100),
    visits: faker.datatype.number(50),
    progress: faker.datatype.number(100),
  })),
};
