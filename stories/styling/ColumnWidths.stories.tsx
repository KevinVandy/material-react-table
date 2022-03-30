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
    header: 'ID',
    id: 'id',
    maxWidth: 50,
  },
  {
    header: 'First Name',
    id: 'firstName',
    minWidth: 300,
  },
  {
    header: 'Last Name',
    id: 'lastName',
    width: 100,
  },
  {
    header: 'Age',
    id: 'age',
    maxWidth: 50,
  },
  {
    header: 'Address',
    id: 'address',
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
