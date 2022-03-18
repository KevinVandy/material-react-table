import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, { MaterialReactTableProps } from '../../src';
import faker from '@faker-js/faker';

const meta: Meta = {
  title: 'Styling/Custom Column Widths',
};

export default meta;

const columns = [
  {
    Header: 'ID',
    accessor: 'id' as const,
    maxWidth: 50,
  },
  {
    Header: 'First Name',
    accessor: 'firstName' as const,
    minWidth: 300,
  },
  {
    Header: 'Last Name',
    accessor: 'lastName' as const,
    width: 100,
  },
  {
    Header: 'Age',
    accessor: 'age' as const,
    maxWidth: 50,
  },
  {
    Header: 'Address',
    accessor: 'address' as const,
  },
];
const data = [...Array(21)].map((_) => ({
  id: faker.datatype.number(100),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number(80),
  address: faker.address.streetAddress(),
}));

export const CustomWidths: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable columns={columns} data={data} />
);
