import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, { MaterialReactTableProps } from '../../src';
import faker from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Column Grouping Examples',
};

export default meta;

const columns = [
  {
    Header: 'First Name',
    accessor: 'firstName',
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
  },
  {
    Header: 'Gender',
    accessor: 'gender',
  },
  {
    Header: 'City',
    accessor: 'city',
  },
  {
    Header: 'State',
    accessor: 'state',
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
  <MaterialReactTable
    columns={columns}
    data={data}
    enableColumnActions
    enableColumnHiding
    enableColumnGrouping
  />
);
