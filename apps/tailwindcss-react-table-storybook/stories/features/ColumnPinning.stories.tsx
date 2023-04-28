import React from 'react';
import { Meta } from '@storybook/react';
import TailwindCSSReactTable, {
  type TRT_ColumnDef,
} from 'tailwindcss-react-table';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Column Pinning Examples',
};

export default meta;

const columns: TRT_ColumnDef<(typeof data)[0]>[] = [
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

export const ColumnPinningEnabled = () => (
  <TailwindCSSReactTable columns={columns} data={data} enablePinning />
);

export const ColumnPinningInitial = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    enablePinning
    initialState={{ columnPinning: { left: ['email'], right: ['state'] } }}
  />
);

export const ColumnPinningDisabledPerColumn = () => (
  <TailwindCSSReactTable
    columns={[
      {
        header: 'First Name',
        accessorKey: 'firstName',
        enablePinning: false,
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
    ]}
    data={data}
    enablePinning
  />
);

export const ColumnPinningWithSelect = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    enablePinning
    enableRowSelection
  />
);

export const ColumnPinningWithDetailPanel = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    enablePinning
    enableExpanding
    renderDetailPanel={({ row: _row }) => <h1>Hi</h1>}
  />
);
