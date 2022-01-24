import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, { MaterialReactTableProps } from '../../src';
import faker from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Toolbar Examples',
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
    Header: 'Age',
    accessor: 'age',
  },
  {
    Header: 'Address',
    accessor: 'address',
  },
  {
    Header: 'Phone Number',
    accessor: 'phoneNumber',
  },
];

const data = [...Array(5)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number(80),
  address: faker.address.streetAddress(),
  phoneNumber: faker.phone.phoneNumber(),
}));

export const ToolbarEnabled: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable columns={columns} data={data} showToolbar />
);

export const ToolbarEnabledWithTitle: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    showToolbar
    title="My People Table"
  />
);

export const ToolbarEnabledWithSearch: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    showToolbar
    title="My People Table"
    enableSearch
  />
);
