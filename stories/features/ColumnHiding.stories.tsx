import React from 'react';
import { Meta, Story } from '@storybook/react';
import { MaterialReactTable, MaterialReactTableProps } from '../../src';
import faker from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Column Hiding Examples',
};

export default meta;

const columns = [
  {
    Header: 'First Name',
    accessor: 'firstName',
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
  },
  {
    Header: 'Address',
    accessor: 'address',
  },
  {
    Header: 'State',
    accessor: 'state',
  },
  {
    Header: 'Zip',
    accessor: 'zip',
  },
  {
    Header: 'Phone Number',
    accessor: 'phoneNumber',
  },
];

const data = [...Array(100)].map((_) => ({
  firstName: faker.name.firstName(),
  middleName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  zip: faker.address.zipCode(),
  phoneNumber: faker.phone.phoneNumber(),
}));

export const ColumnHidingEnabled: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable columns={columns} data={data} enableColumnHiding />
);
