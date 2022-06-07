import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, {
  MaterialReactTableProps,
  MRT_ColumnDef,
} from '../../src';
import faker from '@faker-js/faker';
import { Typography } from '@mui/material';

const meta: Meta = {
  title: 'Features/Virtualization',
};

export default meta;

const shortColumns: MRT_ColumnDef[] = [
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

const longColumns: MRT_ColumnDef[] = [
  {
    header: 'First Name',
    id: 'firstName',
  },
  {
    header: 'Middle Name',
    id: 'middleName',
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
    header: 'Phone Number',
    id: 'phoneNumber',
  },
  {
    header: 'Address',
    id: 'address',
  },
  {
    header: 'Zip Code',
    id: 'zipCode',
  },
  {
    header: 'City',
    id: 'city',
  },
  {
    header: 'State',
    id: 'state',
  },
  {
    header: 'Country',
    id: 'country',
  },
  {
    header: 'Favorite Quote',
    id: 'favoriteQuote',
  },
  {
    header: 'Favorite Color',
    id: 'favoriteColor',
  },
  {
    header: 'Pet Name',
    id: 'petName',
  },
];

const shortData = [...Array(500)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  state: faker.address.state(),
}));

const longData = [...Array(500)].map((_) => ({
  firstName: faker.name.firstName(),
  middleName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  phoneNumber: faker.phone.phoneNumber(),
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
    enableTableFooter={false}
  />
);

export const EnableRowVirtualization: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={longColumns}
    data={longData}
    enablePagination={false}
    enableRowVirtualization
    enableTableFooter={false}
  />
);
