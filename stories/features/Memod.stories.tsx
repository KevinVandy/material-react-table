import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, {
  MaterialReactTableProps,
  MRT_ColumnDef,
} from '../../src';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Memo Mode Examples',
};

export default meta;

const columns: MRT_ColumnDef<typeof data[0]>[] = [
  {
    header: 'First Name',
    accessorKey: 'firstName',
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
  },
  {
    header: 'gender',
    accessorKey: 'gender',
  },
  {
    header: 'Age',
    accessorKey: 'age',
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
  {
    header: 'Zip',
    accessorKey: 'zipCode',
  },
];

const data = [...Array(55)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  gender: faker.name.sex(),
  age: faker.datatype.number(80),
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  state: faker.address.state(),
  zipCode: faker.address.zipCode(),
}));

export const NoMemos: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableColumnOrdering
    enableEditing
    enableGrouping
    enablePinning
    enableRowNumbers
    initialState={{ pagination: { pageSize: 100, pageIndex: 0 } }}
    memoMode="none"
  />
);

export const MemoCells: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableColumnOrdering
    enableEditing
    enableGrouping
    enablePinning
    enableRowNumbers
    initialState={{ pagination: { pageSize: 100, pageIndex: 0 } }}
    memoMode="cell"
  />
);

export const MemoRows: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableColumnOrdering
    enableEditing
    enableGrouping
    enablePinning
    enableRowNumbers
    initialState={{ pagination: { pageSize: 100, pageIndex: 0 } }}
    memoMode="row"
  />
);

export const MemoTableBody: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableColumnOrdering
    enableEditing
    enableGrouping
    enablePinning
    enableRowNumbers
    initialState={{ pagination: { pageSize: 100, pageIndex: 0 } }}
    memoMode="table-body"
  />
);
