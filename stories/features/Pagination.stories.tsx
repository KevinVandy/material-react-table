import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, { MaterialReactTableProps } from '../../src';
import faker from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Pagination Examples',
};

export default meta;

const columns = [
  {
    header: 'First Name',
    id: 'firstName',
  },
  {
    header: 'Last Name',
    id: 'lastName',
  },
  {
    header: 'Age',
    id: 'age',
  },
  {
    header: 'Address',
    id: 'address',
  },
];
const data = [...Array(21)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number(80),
  address: faker.address.streetAddress(),
}));

export const PaginationEnabledDefault: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable columns={columns} data={data} />
);

export const PaginationDisabledOrOverriden: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable columns={columns} data={data} enablePagination={false} />
);

export const PaginationPositionBottom: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    positionPagination="bottom"
  />
);

export const PaginationPositionTop: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable columns={columns} data={data} positionPagination="top" />
);

export const PaginationPositionTopAndBottom: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable columns={columns} data={data} positionPagination="both" />
);

export const CustomizePaginationComponents: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    initialState={{ pagination: { pageSize: 5 } }}
    muiTablePaginationProps={{
      rowsPerPageOptions: [5, 10, 20],
      showFirstButton: false,
      showLastButton: false,
      SelectProps: { native: true },
      labelRowsPerPage: 'Number of rows visible',
    }}
  />
);
