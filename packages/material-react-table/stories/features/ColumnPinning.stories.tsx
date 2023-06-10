import { type Meta } from '@storybook/react';
import { MaterialReactTable, type MRT_ColumnDef } from '../../src';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Column Pinning Examples',
};

export default meta;

const columns: MRT_ColumnDef<(typeof data)[0]>[] = [
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
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  address: faker.location.streetAddress(),
  city: faker.location.city(),
  state: faker.location.state(),
}));

export const ColumnPinningEnabled = () => (
  <MaterialReactTable columns={columns} data={data} enablePinning />
);

export const ColumnPinningInitial = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enablePinning
    initialState={{ columnPinning: { left: ['email'], right: ['state'] } }}
  />
);

export const ColumnPinningDisabledPerColumn = () => (
  <MaterialReactTable
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
  <MaterialReactTable
    columns={columns}
    data={data}
    enablePinning
    enableRowSelection
  />
);

export const ColumnPinningWithDetailPanel = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enablePinning
    enableExpanding
    renderDetailPanel={({ row: _row }) => <h1>Hi</h1>}
  />
);
