import { type MRT_ColumnDef, MaterialReactTable } from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Features/Column Resizing Examples',
};

export default meta;

const columns: MRT_ColumnDef<(typeof data)[0]>[] = [
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'state',
    header: 'State',
  },
  {
    accessorKey: 'zipCode',
    header: 'Zip Code',
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone Number',
  },
];

const data = [...Array(88)].map(() => ({
  address: faker.location.streetAddress(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  phoneNumber: faker.phone.number(),
  state: faker.location.state(),
  zipCode: faker.location.zipCode(),
}));

export const ColumnResizingEnabledDefaultOnChange = () => (
  <MaterialReactTable columns={columns} data={data} enableColumnResizing />
);

export const ColumnResizingEnabledNoColumnActions = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableColumnActions={false}
    enableColumnResizing
  />
);

export const ColumnResizingDisabledSomeColumns = () => (
  <MaterialReactTable
    columns={[
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'state',
        header: 'State',
      },
      {
        accessorKey: 'zipCode',
        enableResizing: false,
        header: 'Zip Code',
      },
      {
        accessorKey: 'phoneNumber',
        header: 'Phone Number',
      },
    ]}
    data={data}
    enableColumnResizing
  />
);

export const ColumnResizingEnabledOnEnd = () => (
  <MaterialReactTable
    columnResizeMode="onEnd"
    columns={columns}
    data={data}
    enableColumnResizing
  />
);

export const ColumnResizingCustomDefaultWidths = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    defaultColumn={{ maxSize: 300, minSize: 100, size: 150 }}
    enableColumnResizing
  />
);

export const ColumnResizingWithPinning = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableColumnPinning
    enableColumnResizing
    initialState={{ columnPinning: { left: ['firstName', 'lastName'] } }}
  />
);

export const ColumnResizingWithHeaderGroups = () => (
  <MaterialReactTable
    columns={[
      {
        columns: [
          {
            accessorKey: 'firstName',
            footer: 'First Name',
            header: 'First Name',
          },

          {
            accessorKey: 'lastName',
            footer: 'Last Name',
            header: 'Last Name',
          },
        ],
        footer: 'Name',
        header: 'Name',
      },
      {
        columns: [
          {
            accessorKey: 'age',
            footer: 'Age',
            header: 'Age',
          },
          {
            accessorKey: 'address',
            footer: 'Address',
            header: 'Address',
          },
        ],
        footer: 'Info',
        header: 'Info',
      },
    ]}
    data={[...Array(5)].map(() => ({
      address: faker.location.streetAddress(),
      age: faker.datatype.number(80),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    }))}
    enableColumnResizing
    enableRowSelection
  />
);

export const ColumnResizingWithHeaderGroupsGrid = () => (
  <MaterialReactTable
    columns={[
      {
        columns: [
          {
            accessorKey: 'firstName',
            footer: 'First Name',
            header: 'First Name',
          },

          {
            accessorKey: 'lastName',
            footer: 'Last Name',
            header: 'Last Name',
          },
        ],
        footer: 'Name',
        header: 'Name',
      },
      {
        columns: [
          {
            accessorKey: 'age',
            footer: 'Age',
            header: 'Age',
          },
          {
            accessorKey: 'address',
            footer: 'Address',
            header: 'Address',
          },
        ],
        footer: 'Info',
        header: 'Info',
      },
    ]}
    data={[...Array(5)].map(() => ({
      address: faker.location.streetAddress(),
      age: faker.datatype.number(80),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    }))}
    enableColumnResizing
    enableRowSelection
    layoutMode="grid"
  />
);

export const ColumnResizingLayoutGridNoFlexGrow = () => (
  <MaterialReactTable
    columns={columns.slice(0, 3)}
    data={data}
    enableColumnResizing
    enableRowSelection
    layoutMode="grid"
    muiTableBodyCellProps={{
      sx: {
        flex: '0 0 auto',
      },
    }}
    muiTableHeadCellProps={{
      sx: {
        flex: '0 0 auto',
      },
    }}
  />
);
