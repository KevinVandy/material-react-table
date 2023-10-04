import { useState } from 'react';
import {
  type MRT_ColumnDef,
  type MRT_SortingState,
  MaterialReactTable,
} from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Features/Sorting Examples',
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

export const SortingEnabledDefault = () => (
  <MaterialReactTable columns={columns} data={data} />
);

export const DisableSorting = () => (
  <MaterialReactTable columns={columns} data={data} enableSorting={false} />
);

export const DisableSortingForSpecificColumns = () => (
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
        enableSorting: false,
        header: 'Address',
      },
      {
        accessorKey: 'state',
        header: 'State',
      },
      {
        accessorKey: 'phoneNumber',
        enableSorting: false,
        header: 'Phone Number',
      },
    ]}
    data={data}
  />
);

export const DisableMultiSorting = () => (
  <MaterialReactTable columns={columns} data={data} enableMultiSort={false} />
);

export const DisableSortingRemoval = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableSortingRemoval={false}
  />
);

export const SortRanking = () => (
  <MaterialReactTable
    columns={[
      {
        accessorKey: 'firstName',
        header: 'First Name',
        sortingFn: 'fuzzy',
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
    ]}
    data={data}
    enableRowNumbers
    initialState={{ sorting: [{ desc: false, id: 'firstName' }] }}
  />
);

export const SortingStateManaged = () => {
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      onSortingChange={setSorting}
      state={{ sorting }}
    />
  );
};
