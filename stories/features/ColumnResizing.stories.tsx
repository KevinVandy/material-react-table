import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, { MaterialReactTableProps } from '../../src';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Column Resizing Examples',
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
    header: 'Zip Code',
    id: 'zipCode',
  },
  {
    header: 'Phone Number',
    id: 'phoneNumber',
  },
];

const data = [...Array(8)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  zipCode: faker.address.zipCode(),
  phoneNumber: faker.phone.number(),
}));

export const ColumnResizingEnabledDefaultOnEnd: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable columns={columns} data={data} enableColumnResizing />
);

export const ColumnResizingDisabledSomeColumns: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable
    columns={[
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
        header: 'Zip Code',
        id: 'zipCode',
        enableResizing: false,
      },
      {
        header: 'Phone Number',
        id: 'phoneNumber',
      },
    ]}
    data={data}
    enableColumnResizing
  />
);

export const ColumnResizingEnabledOnChange: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableColumnResizing
    columnResizeMode="onChange"
  />
);

export const ColumnResizingCustomDefaultWidths: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableColumnResizing
    defaultColumn={{ size: 150, minSize: 100, maxSize: 300 }}
  />
);

export const ColumnResizingWithPinning: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableColumnResizing
    enablePinning
    initialState={{ columnPinning: { left: ['firstName', 'lastName'] } }}
  />
);

export const ColumnResizingWithHeaderGroups: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable
    columns={[
      {
        header: 'Name',
        id: 'name',
        footer: 'Name',
        columns: [
          {
            header: 'First Name',
            footer: 'First Name',
            id: 'firstName',
          },

          {
            header: 'Last Name',
            footer: 'Last Name',
            id: 'lastName',
          },
        ],
      },
      {
        header: 'Info',
        id: 'info',
        footer: 'Info',
        columns: [
          {
            header: 'Age',
            footer: 'Age',
            id: 'age',
          },
          {
            header: 'Address',
            footer: 'Address',
            id: 'address',
          },
        ],
      },
    ]}
    data={[...Array(5)].map(() => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      age: faker.datatype.number(80),
      address: faker.address.streetAddress(),
    }))}
    enableColumnResizing
    enableRowSelection
  />
);
