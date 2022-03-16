import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, { MaterialReactTableProps } from '../../src';
import faker from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/CopyButton',
  parameters: {
    status: {
      type: 'alpha',
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
    Header: 'Email Address',
    accessor: 'email' as const,
  },
  {
    Header: 'Address',
    accessor: 'address' as const,
  },
  {
    Header: 'City',
    accessor: 'city' as const,
  },
  {
    Header: 'State',
    accessor: 'state' as const,
  },
];

const data = [...Array(100)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  state: faker.address.state(),
}));

export const EnableCopyButtons: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable columns={columns} data={data} enableCellCopyButtons />
);
