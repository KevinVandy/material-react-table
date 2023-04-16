import React from 'react';
 import { Meta } from '@storybook/react';
import MaterialReactTable, {
  type MaterialReactTableProps,
  type MRT_ColumnDef,
} from 'material-react-table';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Layout Mode Examples',
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
    header: 'Phone Number',
    accessorKey: 'phoneNumber',
  },
];

const data = [...Array(100)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  phoneNumber: faker.phone.number(),
}));

export const DefaultSemantic = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    layoutMode="semantic"
    enableRowSelection
    enableColumnOrdering
  />
);

export const Grid = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    layoutMode="grid"
    enableRowSelection
    enableColumnOrdering
  />
);

export const GridNoGrow = () => (
  <MaterialReactTable
    columns={columns.slice(0, 2)}
    data={data}
    layoutMode="grid"
    enableRowSelection
    enableColumnOrdering
    muiTableHeadCellProps={{
      sx: {
        flex: '0 0 auto',
      },
    }}
    muiTableBodyCellProps={{
      sx: {
        flex: '0 0 auto',
      },
    }}
  />
);

export const GridWithResizing = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    layoutMode="grid"
    enableRowSelection
    enableColumnOrdering
    enableColumnResizing
  />
);

export const GridNoGrowWithResizing = () => (
  <MaterialReactTable
    columns={columns.slice(0, 2)}
    data={data}
    layoutMode="grid"
    enableRowSelection
    enableColumnOrdering
    enableColumnResizing
    muiTableHeadCellProps={{
      sx: {
        flex: '0 0 auto',
      },
    }}
    muiTableBodyCellProps={{
      sx: {
        flex: '0 0 auto',
      },
    }}
  />
);
