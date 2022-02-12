import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, { MaterialReactTableProps } from '../../src';
import faker from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Column Hiding Examples',
  parameters: {
    status: {
      type: 'stable',
    },
  },
};

export default meta;

const columns = [
  {
    Header: 'First Name',
    accessor: 'firstName' as const,
  },
  {
    Header: 'Last Name',
    accessor: 'lastName' as const,
  },
  {
    Header: 'Address',
    accessor: 'address' as const,
  },
  {
    Header: 'State',
    accessor: 'state' as const,
  },
  {
    Header: 'Zip',
    accessor: 'zip' as const,
  },
  {
    Header: 'Email Address',
    accessor: 'email' as const,
  },
  {
    Header: 'Phone Number',
    accessor: 'phoneNumber' as const,
  },
];

const data = [...Array(100)].map((_) => ({
  firstName: faker.name.firstName(),
  middleName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  zip: faker.address.zipCode(),
  email: faker.internet.email(),
  phoneNumber: faker.phone.phoneNumber(),
}));

export const ColumnHidingEnabledDefault: Story<
  MaterialReactTableProps
> = () => <MaterialReactTable columns={columns} data={data} />;

export const ColumnHidingDisabled: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable columns={columns} data={data} disableColumnHiding />
);

export const ColumnHidingWithHeaderGroups: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable
    columns={[
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName' as const,
          },
          {
            Header: 'Last Name',
            accessor: 'lastName' as const,
          },
        ],
      },
      {
        Header: 'Mailing Info',
        columns: [
          {
            Header: 'Address',
            accessor: 'address' as const,
          },
          {
            Header: 'State',
            accessor: 'state' as const,
          },
          {
            Header: 'Zip',
            accessor: 'zip' as const,
          },
        ],
      },
      {
        Header: 'Contact Info',
        columns: [
          {
            Header: 'Email Address',
            accessor: 'email' as const,
          },
          {
            Header: 'Phone Number',
            accessor: 'phoneNumber' as const,
          },
        ],
      },
    ]}
    data={data}
  />
);
