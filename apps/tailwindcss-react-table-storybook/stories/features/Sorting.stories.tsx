import React from 'react';
import { Meta } from '@storybook/react';
import TailwindCSSReactTable, {
  type TRT_ColumnDef,
  type TRT_SortingState,
} from 'tailwindcss-react-table';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Sorting Examples',
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

export const SortingEnabledDefault = () => (
  <TailwindCSSReactTable columns={columns} data={data} />
);

export const DisableSorting = () => (
  <TailwindCSSReactTable columns={columns} data={data} enableSorting={false} />
);

export const DisableSortingForSpecificColumns = () => (
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
        header: 'Address',
        accessorKey: 'address',
        enableSorting: false,
      },
      {
        header: 'State',
        accessorKey: 'state',
      },
      {
        header: 'Phone Number',
        accessorKey: 'phoneNumber',
        enableSorting: false,
      },
    ]}
    data={data}
  />
);

export const DisableMultiSorting = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    enableMultiSort={false}
  />
);

export const SortRanking = () => (
  <TailwindCSSReactTable
    columns={[
      {
        header: 'First Name',
        accessorKey: 'firstName',
        sortingFn: 'fuzzy',
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
    ]}
    data={data}
    enableRowNumbers
    initialState={{ sorting: [{ id: 'firstName', desc: false }] }}
  />
);

export const SortingStateManaged = () => {
  const [sorting, setSorting] = React.useState<TRT_SortingState>([]);
  return (
    <TailwindCSSReactTable
      columns={columns}
      data={data}
      state={{ sorting }}
      onSortingChange={setSorting}
    />
  );
};
