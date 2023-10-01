import { type Meta } from '@storybook/react';
import { MaterialReactTable, type MRT_ColumnDef } from '../../src';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Row Pinning Examples',
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

const data = [...Array(50)].map(() => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  address: faker.location.streetAddress(),
  city: faker.location.city(),
  state: faker.location.state(),
}));

export const RowPinningStickyDefaultEnabled = () => (
  <MaterialReactTable columns={columns} data={data} enableRowPinning />
);

export const RowPinningStickyNoPagination = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowPinning
    enablePagination={false}
    muiTableContainerProps={{
      sx: {
        maxHeight: '600px',
      },
    }}
  />
);

export const RowPinningStickyCustomRowHeight = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowPinning
    rowPinningDisplayMode="sticky"
    enablePagination={false}
    muiTableContainerProps={{
      sx: {
        maxHeight: '600px',
      },
    }}
    muiTableBodyRowProps={{
      sx: {
        height: '100px',
      }
    }}
  />
);

export const RowPinningSelectStickyMode = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enablePagination={false}
    enableRowPinning
    enableRowSelection
    rowPinningDisplayMode="select-sticky"
    muiTableContainerProps={{
      sx: {
        maxHeight: '600px',
      },
    }}
  />
);

export const RowPinningTopAndBottomMode = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowPinning
    rowPinningDisplayMode="top-and-bottom"
    enablePagination={false}
    muiTableContainerProps={{
      sx: {
        maxHeight: '600px',
      },
    }}
  />
);

export const RowPinningTopMode = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowPinning
    rowPinningDisplayMode="top"
    enablePagination={false}
    muiTableContainerProps={{
      sx: {
        maxHeight: '600px',
      },
    }}
  />
);

export const RowPinningSelectTopMode = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enablePagination={false}
    enableRowPinning
    enableRowSelection
    rowPinningDisplayMode="select-top"
    muiTableContainerProps={{
      sx: {
        maxHeight: '600px',
      },
    }}
  />
);

export const RowPinningBottomMode = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowPinning
    rowPinningDisplayMode="bottom"
    enablePagination={false}
    muiTableContainerProps={{
      sx: {
        maxHeight: '600px',
      },
    }}
  />
);

export const RowPinningSelectBottomMode = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enablePagination={false}
    enableRowPinning
    enableRowSelection
    rowPinningDisplayMode="select-bottom"
    muiTableContainerProps={{
      sx: {
        maxHeight: '600px',
      },
    }}
  />
);

export const RowPinningWithStickyHeader = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowPinning
    enableStickyHeader
    enableStickyFooter
    enablePagination={false}
    muiTableContainerProps={{
      sx: {
        maxHeight: '600px',
      },
    }}
  />
);

export const RowPinningWithGridLayout = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowPinning
    layoutMode="grid"
    enablePagination={false}
    muiTableContainerProps={{
      sx: {
        maxHeight: '600px',
      },
    }}
  />
);

export const RowPinningStickyWithVirtualization = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowPinning
    enableRowVirtualization
    enablePagination={false}
    muiTableContainerProps={{
      sx: {
        maxHeight: '600px',
      },
    }}
  />
);

export const RowPinningTopWithVirtualization = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowPinning
    rowPinningDisplayMode="top"
    enableRowVirtualization
    enablePagination={false}
    muiTableContainerProps={{
      sx: {
        maxHeight: '600px',
      },
    }}
  />
);
