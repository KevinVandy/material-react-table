import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, {
  MaterialReactTableProps,
  MRT_ColumnDef,
} from '../../src';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Column Action Examples',
};

export default meta;

interface Row {
  firstName: string;
  lastName: string;
  address: string;
  state: string;
  phoneNumber: string;
}

const columns: MRT_ColumnDef<Row>[] = [
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
    header: 'Phone Number',
    accessorKey: 'phoneNumber',
  },
];

const data: Row[] = [...Array(100)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  phoneNumber: faker.phone.number(),
}));

export const ColumnActionsEnabledDefault: Story<
  MaterialReactTableProps
> = () => <MaterialReactTable columns={columns} data={data} />;

export const ColumnActionsDisabled: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableColumnActions={false}
  />
);

export const ColumnActionsDisabledPerColumn: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable
    columns={[
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
        enableColumnActions: false,
      },
      {
        header: 'State',
        accessorKey: 'state',
        enableColumnActions: false,
      },
      {
        header: 'Phone Number',
        accessorKey: 'phoneNumber',
        enableColumnActions: false,
      },
    ]}
    data={data}
  />
);

export const ColumnActionsEnabledPerColumn: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable
    columns={[
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
        enableColumnActions: true,
      },
      {
        header: 'State',
        accessorKey: 'state',
        enableColumnActions: true,
      },
      {
        header: 'Phone Number',
        accessorKey: 'phoneNumber',
        enableColumnActions: true,
      },
    ]}
    data={data}
    enableColumnActions={false}
  />
);
