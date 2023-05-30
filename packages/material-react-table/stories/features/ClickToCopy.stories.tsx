import { type Meta } from '@storybook/react';
import { MaterialReactTable, type MRT_ColumnDef } from '../../src';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Click to Copy Examples',
};

export default meta;

const columns: MRT_ColumnDef<(typeof data)[0]>[] = [
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
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  },
  email: faker.internet.email(),
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  state: faker.address.state(),
}));

export const ClickToCopyEnabled = () => (
  <MaterialReactTable columns={columns} data={data} enableClickToCopy />
);

export const ClickToCopyEnabledWithColumnResizing = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableClickToCopy
    enableColumnResizing
  />
);

export const ClickToCopyEnabledPerColumn = () => (
  <MaterialReactTable
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
  <MaterialReactTable
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
