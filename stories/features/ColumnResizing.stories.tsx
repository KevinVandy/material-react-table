import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, { MaterialReactTableProps } from '../../src';
import faker from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Column Resizing Examples',
  parameters: {
    status: {
      type: 'proofOfConcept',
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
    header: 'Zip Code',
    id: 'zipCode',
  },
  {
    header: 'Phone Number',
    id: 'phoneNumber',
  },
];

const data = [...Array(8)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  zipCode: faker.address.zipCode(),
  phoneNumber: faker.phone.phoneNumber(),
}));

export const ColumnResizingEnabled: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable columns={columns} data={data} enableColumnResizing />
);

export const ColumnResizingCustomDefaultWidths: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableColumnResizing
    defaultColumn={{ width: 150, minWidth: 100, maxWidth: 300 }}
  />
);
