import { type Meta } from '@storybook/react';
import { MaterialReactTable, type MRT_ColumnDef } from '../../src';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Column Hiding Examples',
};

export default meta;

const columns: MRT_ColumnDef<(typeof data)[0]>[] = [
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
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  address: faker.location.streetAddress(),
  state: faker.location.state(),
  zip: faker.location.zipCode(),
  email: faker.internet.email(),
  phoneNumber: faker.phone.number(),
}));

export const ColumnHidingEnabledDefault = () => (
  <MaterialReactTable columns={columns} data={data} />
);

export const ColumnHidingDisabled = () => (
  <MaterialReactTable columns={columns} data={data} enableHiding={false} />
);

export const ColumnHidingDisabledButWithOrdering = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableHiding={false}
    enableColumnOrdering
  />
);

export const ColumnHidingDisabledButWithPinning = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableHiding={false}
    enablePinning
  />
);

export const ColumnHidingDisabledPerColumn = () => (
  <MaterialReactTable
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
  <MaterialReactTable
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
