import React from 'react';
import { Meta } from '@storybook/react';
import TailwindCSSReactTable, {
  type TRT_ColumnDef,
} from 'tailwindcss-react-table';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Styling/Table Alignment Examples',
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
    header: 'Age',
    accessorKey: 'age',
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

const data = [...Array(25)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number({ min: 20, max: 60 }),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  phoneNumber: faker.phone.number(),
}));

export const DefaultLeft = () => (
  <TailwindCSSReactTable columns={columns} data={data} />
);

export const RightCells = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    muiTableHeadCellProps={{
      align: 'right',
    }}
    muiTableBodyCellProps={{
      align: 'right',
    }}
    enableColumnResizing
  />
);

export const CenterCells = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    muiTableHeadCellProps={{
      align: 'center',
    }}
    muiTableBodyCellProps={{
      align: 'center',
    }}
  />
);

export const CenterCellsWithGrabHandle = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    enableColumnDragging
    muiTableHeadCellProps={{
      align: 'center',
    }}
    muiTableBodyCellProps={{
      align: 'center',
    }}
  />
);

export const CenterCellsWithGrabHandleNoSorting = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    enableColumnDragging
    enableSorting={false}
    muiTableHeadCellProps={{
      align: 'center',
    }}
    muiTableBodyCellProps={{
      align: 'center',
    }}
  />
);

export const CenterCellsNoColumnActions = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    enableColumnActions={false}
    muiTableHeadCellProps={{
      align: 'center',
    }}
    muiTableBodyCellProps={{
      align: 'center',
    }}
  />
);

export const RightAlignNumberColumn = () => (
  <TailwindCSSReactTable
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
        header: 'Age',
        accessorKey: 'age',
        muiTableBodyCellProps: {
          align: 'right',
        },
        muiTableHeadCellProps: {
          align: 'right',
        },
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
    ]}
    data={data}
  />
);
