import React from 'react';
import { Meta } from '@storybook/react';
import TailwindCSSReactTable, {
  type TRT_ColumnDef,
} from 'tailwindcss-react-table';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Click to Copy Examples',
};

export default meta;

const columns: TRT_ColumnDef<(typeof data)[0]>[] = [
  {
    header: 'First Name',
    accessorKey: 'name.firstName',
  },
  {
    header: 'Last Name',
    accessorKey: 'name.lastName',
  },
  {
    header: 'Email Address',
    accessorKey: 'email',
  },
  {
    header: 'Address',
    accessorKey: 'address',
  },
  {
    header: 'City',
    accessorKey: 'city',
  },
  {
    header: 'State',
    accessorKey: 'state',
  },
];

const data = [...Array(100)].map(() => ({
  name: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  },
  email: faker.internet.email(),
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  state: faker.address.state(),
}));

export const ClickToCopyEnabled = () => (
  <TailwindCSSReactTable columns={columns} data={data} enableClickToCopy />
);

export const ClickToCopyEnabledWithColumnResizing = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    enableClickToCopy
    enableColumnResizing
  />
);

export const ClickToCopyEnabledPerColumn = () => (
  <TailwindCSSReactTable
    columns={[
      {
        header: 'First Name',
        accessorKey: 'name.firstName',
      },
      {
        header: 'Last Name',
        accessorKey: 'name.lastName',
      },
      {
        header: 'Email Address',
        accessorKey: 'email',
        enableClickToCopy: true,
      },
      {
        header: 'Address',
        accessorKey: 'address',
      },
      {
        header: 'City',
        accessorKey: 'city',
      },
      {
        header: 'State',
        accessorKey: 'state',
      },
    ]}
    data={data}
  />
);

export const ClickToCopyDisabledPerColumn = () => (
  <TailwindCSSReactTable
    columns={[
      {
        header: 'First Name',
        accessorKey: 'name.firstName',
      },
      {
        header: 'Last Name',
        accessorKey: 'name.lastName',
      },
      {
        header: 'Email Address',
        accessorKey: 'email',
      },
      {
        header: 'Address',
        accessorKey: 'address',
      },
      {
        header: 'City',
        accessorKey: 'city',
        enableClickToCopy: false,
      },
      {
        header: 'State',
        accessorKey: 'state',
        enableClickToCopy: false,
      },
    ]}
    data={data}
    enableClickToCopy
  />
);
