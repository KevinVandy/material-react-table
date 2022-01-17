import React from 'react';
import { Meta, Story } from '@storybook/react';
import { MaterialReactTable, MaterialReactTableProps } from '../src';
import faker from '@faker-js/faker';

const meta: Meta = {
  title: 'Examples/Row Selection Examples',
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
];
const data = [...Array(5)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number(80),
  address: faker.address.streetAddress(),
}));

export const SelectionEnabled: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable columns={columns} data={data} enableSelection />
);

export const SelectAllEnabled: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableSelection
    enableSelectAll
  />
);

export const onRowSelectChange: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableSelection
    onRowSelectChange={(event, rowState, selectedRows) => {
      console.log({ event, rowState, selectedRows });
    }}
  />
);
