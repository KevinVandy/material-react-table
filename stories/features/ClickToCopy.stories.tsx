import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, { MaterialReactTableProps } from '../../src';
import faker from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Click to Copy',
  parameters: {
    status: {
      type: 'beta',
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

const data = [...Array(100)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  state: faker.address.state(),
}));

export const ClickToCopyEnabled: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable columns={columns} data={data} enableClickToCopy />
);
