import React from 'react';
import { Meta } from '@storybook/react';
import TailwindCSSReactTable, {
  type TRT_ColumnDef,
} from 'tailwindcss-react-table';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Column Hiding Examples',
};

export default meta;

const columns: TRT_ColumnDef<(typeof data)[0]>[] = [
  {
    header: 'First Name',
    accessorKey: 'firstName',
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
  },
  {
    header: 'Address',
    accessorKey: 'address',
  },
  {
    header: 'State',
    accessorKey: 'state',
  },
  {
    header: 'Zip',
    accessorKey: 'zip',
  },
  {
    header: 'Email Address',
    accessorKey: 'email',
  },
  {
    header: 'Phone Number',
    accessorKey: 'phoneNumber',
  },
];

const data = [...Array(100)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  zip: faker.address.zipCode(),
  email: faker.internet.email(),
  phoneNumber: faker.phone.number(),
}));

export const ColumnHidingEnabledDefault = () => (
  <TailwindCSSReactTable columns={columns} data={data} />
);

export const ColumnHidingDisabled = () => (
  <TailwindCSSReactTable columns={columns} data={data} enableHiding={false} />
);

export const ColumnHidingDisabledButWithOrdering = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    enableHiding={false}
    enableColumnOrdering
  />
);

export const ColumnHidingDisabledButWithPinning = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    enableHiding={false}
    enablePinning
  />
);

export const ColumnHidingDisabledPerColumn = () => (
  <TailwindCSSReactTable
    columns={[
      {
        header: 'First Name',
        accessorKey: 'firstName',
        enableHiding: false,
      },
      {
        header: 'Last Name',
        accessorKey: 'lastName',
        enableHiding: false,
      },
      {
        header: 'Address',
        accessorKey: 'address',
      },
      {
        header: 'State',
        accessorKey: 'state',
      },
      {
        header: 'Zip',
        accessorKey: 'zip',
      },
      {
        header: 'Email Address',
        accessorKey: 'email',
      },
      {
        header: 'Phone Number',
        accessorKey: 'phoneNumber',
      },
    ]}
    data={data}
  />
);

export const ColumnHidingWithHeaderGroups = () => (
  <TailwindCSSReactTable
    columns={[
      {
        header: 'Name',
        id: 'name',
        columns: [
          {
            header: 'First Name',
            accessorKey: 'firstName',
          },
          {
            header: 'Last Name',
            accessorKey: 'lastName',
          },
        ],
      },
      {
        header: 'Mailing Info',
        id: 'mailingInfo',
        columns: [
          {
            header: 'Address',
            accessorKey: 'address',
          },
          {
            header: 'State',
            accessorKey: 'state',
          },
          {
            header: 'Zip',
            accessorKey: 'zip',
          },
        ],
      },
      {
        header: 'Contact Info',
        id: 'contactInfo',
        columns: [
          {
            header: 'Email Address',
            accessorKey: 'email',
          },
          {
            header: 'Phone Number',
            accessorKey: 'phoneNumber',
          },
        ],
      },
    ]}
    data={data}
  />
);
