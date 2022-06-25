import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, {
  MaterialReactTableProps,
  MRT_ColumnDef,
} from '../../src';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Persistent State',
};

export default meta;

const columns: MRT_ColumnDef[] = [
  {
    header: 'First Name',
    id: 'firstName',
  },
  {
    header: 'Last Name',
    id: 'lastName',
  },
  {
    header: 'Email Address',
    id: 'email',
  },
  {
    header: 'Address',
    id: 'address',
  },
  {
    header: 'City',
    id: 'city',
  },
  {
    header: 'State',
    id: 'state',
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

export const PersistentEnabledLocal: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableColumnResizing
    enablePersistentState
    enablePinning
    enableRowSelection
    tableId="my-table"
  />
);

export const PersistentEnabledSession: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableColumnResizing
    enablePersistentState
    enablePinning
    enableRowSelection
    enableEditing
    tableId="my-table"
    persistentStateMode="sessionStorage"
  />
);
