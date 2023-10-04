import { type MRT_ColumnDef, MaterialReactTable } from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  parameters: {
    status: {
      type: 'stable',
    },
  },
  title: 'Styling/Sticky Header Examples',
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
    accessorKey: 'phoneNumber',
    header: 'Phone Number',
  },
];

const data = [...Array(100)].map(() => ({
  address: faker.location.streetAddress(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  phoneNumber: faker.phone.number(),
  state: faker.location.state(),
}));

export const StickyHeaderDisabledDefault = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    initialState={{ pagination: { pageIndex: 0, pageSize: 25 } }}
  />
);

export const EnableStickyHeader = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableStickyHeader
    initialState={{ pagination: { pageIndex: 0, pageSize: 25 } }}
  />
);

export const StickyHeaderShorterTable = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableColumnPinning
    enableRowSelection
    enableStickyHeader
    initialState={{ pagination: { pageIndex: 0, pageSize: 25 } }}
    muiTableContainerProps={{ sx: { maxHeight: 400 } }}
  />
);

const columnsWithFooters: MRT_ColumnDef<(typeof data)[0]>[] = [
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
  {
    accessorKey: 'address',
    footer: 'Address',
    header: 'Address',
  },
  {
    accessorKey: 'state',
    footer: 'State',
    header: 'State',
  },
  {
    accessorKey: 'phoneNumber',
    footer: 'Phone Number',
    header: 'Phone Number',
  },
];

export const disableStickyFooter = () => (
  <MaterialReactTable
    columns={columnsWithFooters}
    data={data}
    enableRowNumbers
    enableStickyFooter={false}
    enableStickyHeader
    initialState={{ pagination: { pageIndex: 0, pageSize: 25 } }}
    muiTableContainerProps={{ sx: { maxHeight: 400 } }}
  />
);

export const enableStickyFooter = () => (
  <MaterialReactTable
    columns={columnsWithFooters}
    data={data}
    enableRowNumbers
    enableStickyFooter
    enableStickyHeader
    initialState={{ pagination: { pageIndex: 0, pageSize: 25 } }}
    muiTableContainerProps={{ sx: { maxHeight: 400 } }}
  />
);
