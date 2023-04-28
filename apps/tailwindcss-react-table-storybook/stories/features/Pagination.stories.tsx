import React from 'react';
import { Meta } from '@storybook/react';
import TailwindCSSReactTable, {
  type TRT_ColumnDef,
} from 'tailwindcss-react-table';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Pagination Examples',
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
];
const data = [...Array(21)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number(80),
  address: faker.address.streetAddress(),
}));

export const PaginationEnabledDefault = () => (
  <TailwindCSSReactTable columns={columns} data={data} />
);

export const PaginationDisabledOrOverriden = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    enablePagination={false}
  />
);

export const PaginationPositionBottom = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    positionPagination="bottom"
  />
);

export const PaginationPositionTop = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    positionPagination="top"
  />
);

export const PaginationPositionTopAndBottom = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    positionPagination="both"
  />
);

export const PaginationPositionTopAndBottomNoInternalActions = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    positionPagination="both"
    enableToolbarInternalActions={false}
  />
);

export const CustomizePaginationComponents = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    initialState={{ pagination: { pageSize: 5, pageIndex: 0 } }}
    muiTablePaginationProps={{
      rowsPerPageOptions: [5, 10, 20],
      showFirstButton: false,
      showLastButton: false,
      SelectProps: { native: true },
      labelRowsPerPage: 'Number of rows visible',
    }}
  />
);

export const RotateIcons = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    muiTablePaginationProps={{
      backIconButtonProps: {
        style: { transform: 'rotate(180deg)' },
      },
      nextIconButtonProps: {
        style: { transform: 'rotate(180deg)' },
      },
    }}
  />
);
