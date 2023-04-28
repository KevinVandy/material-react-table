import React from 'react';
import { Meta } from '@storybook/react';
import TailwindCSSReactTable, {
  type TRT_ColumnDef,
} from 'tailwindcss-react-table';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Sub Row Tree Examples',
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
    header: 'Phone Number',
    accessorKey: 'phoneNumber',
  },
];

const data = [...Array(5)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number(80),
  address: faker.address.streetAddress(),
  phoneNumber: faker.phone.number(),
  subRows: [...Array(faker.datatype.number(4))].map(() => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.datatype.number(80),
    address: faker.address.streetAddress(),
    phoneNumber: faker.phone.number(),
    subRows: [...Array(3)].map(() => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      age: faker.datatype.number(80),
      address: faker.address.streetAddress(),
      phoneNumber: faker.phone.number(),
      subRows: [...Array(2)].map(() => ({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        age: faker.datatype.number(80),
        address: faker.address.streetAddress(),
        phoneNumber: faker.phone.number(),
      })),
    })),
  })),
}));

export const SubRowTreeEnabledDefault = () => (
  <TailwindCSSReactTable columns={columns} data={data} enableExpanding />
);

export const SubRowTreeDisableExpandAll = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    enableExpanding
    enableExpandAll={false}
  />
);

export const SubRowTreeFilterFromLeafRows = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    enableExpanding
    enablePagination={false}
    filterFromLeafRows
    initialState={{ showColumnFilters: true, expanded: true }}
  />
);

export const SubRowTreeMaxLeafRowFilterDepth0 = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    enableExpanding
    enablePagination={false}
    maxLeafRowFilterDepth={0}
    initialState={{ showColumnFilters: true, expanded: true }}
  />
);

export const SubRowTreeMaxLeafRowFilterDepth1 = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    enableExpanding
    enablePagination={false}
    maxLeafRowFilterDepth={1}
    initialState={{ showColumnFilters: true, expanded: true }}
  />
);

export const SubRowTreeMaxLeafRowFilterDepthAndFilterFromLeafRows = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    enableExpanding
    enablePagination={false}
    filterFromLeafRows
    maxLeafRowFilterDepth={0}
    initialState={{ showColumnFilters: true, expanded: true }}
  />
);

export const SubRowTreeWithSelection = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    enableExpanding
    enablePagination={false}
    enableRowSelection
  />
);

export const SubRowTreeWithSelectionNoSubRowSelection = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    enableExpanding
    enablePagination={false}
    enableRowSelection
    enableSubRowSelection={false}
  />
);

export const SubRowTreeWithSingleSelection = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    enableExpanding
    enableMultiRowSelection={false}
    enablePagination={false}
    enableRowSelection
  />
);
