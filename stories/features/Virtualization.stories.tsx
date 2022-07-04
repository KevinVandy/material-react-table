import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, {
  MaterialReactTableProps,
  MRT_ColumnDef,
} from '../../src';
import { faker } from '@faker-js/faker';
import { Typography } from '@mui/material';

const meta: Meta = {
  title: 'Features/Virtualization',
};

export default meta;

const shortColumns: MRT_ColumnDef[] = [
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

const longColumns: MRT_ColumnDef[] = [
  {
    header: 'First Name',
    accessorKey: 'firstName',
  },
  {
    header: 'Middle Name',
    accessorKey: 'middleName',
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
    header: 'Phone Number',
    accessorKey: 'phoneNumber',
  },
  {
    header: 'Address',
    accessorKey: 'address',
  },
  {
    header: 'Zip Code',
    accessorKey: 'zipCode',
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
    header: 'Country',
    accessorKey: 'country',
  },
  {
    header: 'Favorite Quote',
    accessorKey: 'favoriteQuote',
  },
  {
    header: 'Favorite Color',
    accessorKey: 'favoriteColor',
  },
  {
    header: 'Pet Name',
    accessorKey: 'petName',
  },
];

const shortData = [...Array(500)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  state: faker.address.state(),
}));

const longData = [...Array(500)].map(() => ({
  firstName: faker.name.firstName(),
  middleName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  phoneNumber: faker.phone.number(),
  address: faker.address.streetAddress(),
  zipCode: faker.address.zipCode(),
  city: faker.address.city(),
  state: faker.address.state(),
  country: faker.address.country(),
  favoriteQuote: faker.lorem.sentence(),
  favoriteColor: faker.internet.color(),
  petName: faker.animal.cat(),
}));

export const VirtualizationDisabledDefault: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable
    columns={shortColumns}
    data={shortData}
    enablePagination={false}
    enableRowNumbers
    enableToolbarBottom={false}
  />
);

export const EnableRowVirtualization: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={longColumns}
    data={longData}
    enablePagination={false}
    enableRowNumbers
    enableRowVirtualization
    enableToolbarBottom={false}
  />
);

export const EnableRowVirtualizationWithColumnResizing: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable
    columns={longColumns}
    data={longData}
    enableColumnResizing
    enablePagination={false}
    enableRowNumbers
    enableRowVirtualization
    enableToolbarBottom={false}
  />
);
