import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, { MaterialReactTableProps } from '../../src';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Styling/Custom Column Widths',
};

export default meta;

const columns = [
  {
    header: 'ID',
    accessorKey: 'id',
    size: 50,
  },
  {
    header: 'First Name',
    accessorKey: 'firstName',
    size: 300,
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
    size: 100,
  },
  {
    header: 'Age',
    accessorKey: 'age',
    size: 50,
  },
  {
    header: 'Address',
    accessorKey: 'address',
  },
];
const data = [...Array(21)].map(() => ({
  id: faker.datatype.number(100),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number(80),
  address: faker.address.streetAddress(),
}));

export const CustomWidths: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable columns={columns} data={data} />
);
