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
    header: 'State',
    id: 'state',
  },
  {
    header: 'Zip',
    id: 'zip',
  },
  {
    header: 'Email Address',
    id: 'email',
  },
  {
    header: 'Phone Number',
    id: 'phoneNumber',
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

export const ColumnHidingDisabledPerColumn: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable
    columns={[
      {
        header: 'First Name',
        id: 'firstName',
        disableColumnHiding: true,
      },
      {
        header: 'Last Name',
        id: 'lastName',
        disableColumnHiding: true,
      },
      {
        header: 'Address',
        id: 'address',
      },
      {
        header: 'State',
        id: 'state',
      },
      {
        header: 'Zip',
        id: 'zip',
      },
      {
        header: 'Email Address',
        id: 'email',
      },
      {
        header: 'Phone Number',
        id: 'phoneNumber',
      },
    ]}
    data={data}
  />
);

export const ColumnHidingWithHeaderGroups: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable
    columns={[
      {
        header: 'Name',
        columns: [
          {
            header: 'First Name',
            id: 'firstName',
          },
          {
            header: 'Last Name',
            id: 'lastName',
          },
        ],
      },
      {
        header: 'Mailing Info',
        columns: [
          {
            header: 'Address',
            id: 'address',
          },
          {
            header: 'State',
            id: 'state',
          },
          {
            header: 'Zip',
            id: 'zip',
          },
        ],
      },
      {
        header: 'Contact Info',
        columns: [
          {
            header: 'Email Address',
            id: 'email',
          },
          {
            header: 'Phone Number',
            id: 'phoneNumber',
          },
        ],
      },
    ]}
    data={data}
  />
);
