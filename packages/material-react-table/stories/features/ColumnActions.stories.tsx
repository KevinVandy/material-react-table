import { type Meta } from '@storybook/react';
import { MaterialReactTable, type MRT_ColumnDef } from '../../src';
import { faker } from '@faker-js/faker';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';

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
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  address: faker.location.streetAddress(),
  state: faker.location.state(),
  phoneNumber: faker.phone.number(),
}));

export const ColumnActionsEnabledDefault = () => (
  <MaterialReactTable columns={columns} data={data} />
);

export const ColumnActionsDisabled = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableColumnActions={false}
  />
);

export const ColumnActionsDisabledPerColumn = () => (
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

export const ColumnActionsEnabledPerColumn = () => (
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

export const CustomColumnActions = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    renderColumnActionsMenuItems={() => [
      <MenuItem key={1}>Item 1</MenuItem>,
      <MenuItem key={2}>Item 2</MenuItem>,
    ]}
  />
);

export const CustomColumnActionsPerColumn = () => (
  <MaterialReactTable
    columns={[
      {
        header: 'First Name',
        accessorKey: 'firstName',
        renderColumnActionsMenuItems: () => [
          <MenuItem key={1}>Item 1</MenuItem>,
          <MenuItem key={2}>Item 2</MenuItem>,
        ],
      },
      {
        header: 'Last Name',
        accessorKey: 'lastName',
        renderColumnActionsMenuItems: () => [
          <MenuItem key={1}>Item 2</MenuItem>,
          <MenuItem key={3}>Item 3</MenuItem>,
        ],
      },
      {
        header: 'Address',
        accessorKey: 'address',
        enableColumnActions: true,
        renderColumnActionsMenuItems: ({ internalColumnMenuItems }) => [
          ...internalColumnMenuItems,
          <Divider key={3332} />,
          <MenuItem key={3333}>Item 1</MenuItem>,
          <MenuItem key={3334}>Item 2</MenuItem>,
        ],
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
  />
);
