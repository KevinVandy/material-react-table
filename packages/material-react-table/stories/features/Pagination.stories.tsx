import { type MRT_ColumnDef, MaterialReactTable } from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Features/Pagination Examples',
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
];
const data = [...Array(21)].map(() => ({
  address: faker.location.streetAddress(),
  age: faker.number.int(80),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
}));

export const PaginationEnabledDefault = () => (
  <MaterialReactTable columns={columns} data={data} />
);

export const PaginationEnabledDefaultNoRowsPerPage = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    muiPaginationProps={{
      showRowsPerPage: false,
    }}
  />
);

export const PaginationPagesDisplayMode = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    paginationDisplayMode="pages"
  />
);

export const PaginationPagesDisplayModeNoPagesPerRow = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    muiPaginationProps={{
      showRowsPerPage: false,
    }}
    paginationDisplayMode="pages"
  />
);

export const CustomPaginationPagesDisplayMode = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    muiPaginationProps={{
      shape: 'circular',
      variant: 'outlined',
    }}
    paginationDisplayMode="pages"
  />
);

export const PaginationDisabledOrOverriden = () => (
  <MaterialReactTable columns={columns} data={data} enablePagination={false} />
);

export const PaginationPositionBottom = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    positionPagination="bottom"
  />
);

export const PaginationPositionTop = () => (
  <MaterialReactTable columns={columns} data={data} positionPagination="top" />
);

export const PaginationPositionTopAndBottom = () => (
  <MaterialReactTable columns={columns} data={data} positionPagination="both" />
);

export const PaginationPositionTopAndBottomNoInternalActions = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableToolbarInternalActions={false}
    positionPagination="both"
  />
);

export const CustomizePaginationComponents = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    initialState={{ pagination: { pageIndex: 0, pageSize: 5 } }}
    muiPaginationProps={{
      rowsPerPageOptions: [5, 10, 20],
      showFirstButton: false,
      showLastButton: false,
    }}
  />
);
