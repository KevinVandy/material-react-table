import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, { MaterialReactTableProps } from '../../src';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Sorting Examples',
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
    header: 'Address',
    id: 'address',
  },
  {
    header: 'State',
    id: 'state',
  },
  {
    header: 'Phone Number',
    id: 'phoneNumber',
  },
];

const data = [...Array(100)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  phoneNumber: faker.phone.number(),
}));

export const SortingEnabledDefault: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable columns={columns} data={data} />
);

export const DisableSorting: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable columns={columns} data={data} enableSorting={false} />
);

export const DisableSortingForSpecificColumns: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable
    columns={[
      {
        header: 'First Name',
        id: 'firstName',
      },
      {
        header: 'Last Name',
        id: 'lastName',
      },
      {
        header: 'Address',
        id: 'address',
        enableSorting: false,
      },
      {
        header: 'State',
        id: 'state',
      },
      {
        header: 'Phone Number',
        id: 'phoneNumber',
        enableSorting: false,
      },
    ]}
    data={data}
  />
);

export const DisableMultiSorting: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable columns={columns} data={data} enableMultiSort={false} />
);

export const SortRanking: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={[
      {
        header: 'First Name',
        id: 'firstName',
        sortingFn: 'fuzzy',
      },
      {
        header: 'Last Name',
        id: 'lastName',
      },
      {
        header: 'Address',
        id: 'address',
      },
      {
        header: 'State',
        id: 'state',
      },
      {
        header: 'Phone Number',
        id: 'phoneNumber',
      },
    ]}
    data={data}
    enableRowNumbers
  />
);
