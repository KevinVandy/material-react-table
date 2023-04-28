import React from 'react';
import { Meta } from '@storybook/react';
import MaterialReactTable, { type TRT_ColumnDef } from 'material-react-table';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Column Dragging Examples',
};

export default meta;

type Person = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
};

const columns: TRT_ColumnDef<Person>[] = [
  {
    header: 'First Name',
    accessorKey: 'firstName',
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
  },
  {
    header: 'Email Address',
    accessorKey: 'email',
  },
  {
    header: 'Address',
    accessorKey: 'address',
  },
  {
    header: 'City',
    accessorKey: 'city',
  },
  {
    header: 'State',
    accessorKey: 'state',
  },
];

const data = [...Array(100)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  state: faker.address.state(),
}));

export const ColumnDraggingEnabled = () => (
  <MaterialReactTable columns={columns} data={data} enableColumnDragging />
);

export const ColumnDraggingDisabledPerColumn = () => (
  <MaterialReactTable
    columns={[
      {
        header: 'First Name',
        accessorKey: 'firstName',
      },
      {
        header: 'Last Name',
        accessorKey: 'lastName',
      },
      {
        header: 'Email Address',
        accessorKey: 'email',
      },
      {
        header: 'Address',
        accessorKey: 'address',
      },
      {
        header: 'City',
        accessorKey: 'city',
      },
      {
        header: 'State',
        accessorKey: 'state',
        enableColumnDragging: false,
      },
    ]}
    data={data}
    enableColumnDragging
  />
);
