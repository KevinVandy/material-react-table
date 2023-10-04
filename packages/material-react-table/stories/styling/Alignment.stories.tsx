import { type MRT_ColumnDef, MaterialReactTable } from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Styling/Table Alignment Examples',
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
    accessorKey: 'age',
    header: 'Age',
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

const data = [...Array(25)].map(() => ({
  address: faker.location.streetAddress(),
  age: faker.datatype.number({ max: 60, min: 20 }),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  phoneNumber: faker.phone.number(),
  state: faker.location.state(),
}));

export const DefaultLeft = () => (
  <MaterialReactTable columns={columns} data={data} />
);

export const RightCells = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableColumnResizing
    muiTableBodyCellProps={{
      align: 'right',
    }}
    muiTableHeadCellProps={{
      align: 'right',
    }}
  />
);

export const CenterCells = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    muiTableBodyCellProps={{
      align: 'center',
    }}
    muiTableHeadCellProps={{
      align: 'center',
    }}
  />
);

export const CenterCellsWithGrabHandle = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableColumnDragging
    muiTableBodyCellProps={{
      align: 'center',
    }}
    muiTableHeadCellProps={{
      align: 'center',
    }}
  />
);

export const CenterCellsWithGrabHandleNoSorting = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableColumnDragging
    enableSorting={false}
    muiTableBodyCellProps={{
      align: 'center',
    }}
    muiTableHeadCellProps={{
      align: 'center',
    }}
  />
);

export const CenterCellsNoColumnActions = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableColumnActions={false}
    muiTableBodyCellProps={{
      align: 'center',
    }}
    muiTableHeadCellProps={{
      align: 'center',
    }}
  />
);

export const RightAlignNumberColumn = () => (
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
        accessorKey: 'age',
        header: 'Age',
        muiTableBodyCellProps: {
          align: 'right',
        },
        muiTableHeadCellProps: {
          align: 'right',
        },
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
    ]}
    data={data}
  />
);
