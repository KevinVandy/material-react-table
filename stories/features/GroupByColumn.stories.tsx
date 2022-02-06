import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, { MaterialReactTableProps } from '../../src';
import faker from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Column Grouping Examples',
  parameters: {
    status: {
      type: 'beta',
    },
  },
};

export default meta;

const columns = [
  {
    Header: 'First Name',
    accessor: 'firstName' as const,
  },
  {
    Header: 'Last Name',
    accessor: 'lastName' as const,
  },
  {
    Header: 'Gender',
    accessor: 'gender' as const,
  },
  {
    Header: 'City',
    accessor: 'city' as const,
  },
  {
    Header: 'State',
    accessor: 'state' as const,
  },
];

const data = [...Array(200)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  gender: faker.name.gender(true),
  city: faker.address.city(),
  state: faker.address.state(),
}));

export const ColumnGroupingEnabled: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable columns={columns} data={data} enableColumnGrouping />
);
