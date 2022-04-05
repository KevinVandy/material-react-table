import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, {
  MaterialReactTableProps,
  MRT_ColumnInterface,
} from '../../src';
import faker from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Click to Copy',
  parameters: {
    status: {
      type: 'stable',
    },
  },
};

export default meta;

const columns: MRT_ColumnInterface[] = [
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

export const ClickToCopyEnabledPerColumn: Story<
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
        header: 'Email Address',
        id: 'email',
        enableClickToCopy: true,
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
    ]}
    data={data}
  />
);

export const ClickToCopyDisabledPerColumn: Story<
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
        enableClickToCopy: false,
      },
      {
        header: 'State',
        id: 'state',
        enableClickToCopy: false,
      },
    ]}
    data={data}
    enableClickToCopy
  />
);
