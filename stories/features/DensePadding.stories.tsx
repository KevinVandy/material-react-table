import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, { MaterialReactTableProps } from '../../src';
import faker from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Dense Padding Examples',
  parameters: {
    status: {
      type: 'stable',
    },
  },
};

export default meta;

const columns = [
  {
    header: 'First Name',
    id: 'firstName',
  },
  {
    header: 'Last Name',
    id: 'lastName',
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
  {
    header: 'Zip Code',
    id: 'zipCode',
  },
  {
    header: 'Phone Number',
    id: 'phoneNumber',
  },
];

const data = [...Array(25)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  state: faker.address.state(),
  zipCode: faker.address.zipCode(),
  phoneNumber: faker.phone.phoneNumber(),
}));

export const DensePaddingToggleEnabledDefault: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    initialState={{ pageSize: 25 }}
  />
);

export const DensePaddingDisabled: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    disableDensePaddingToggle
    initialState={{ pageSize: 25 }}
  />
);

export const DefaultToDensePadding: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    initialState={{ pageSize: 25, densePadding: true }}
  />
);
