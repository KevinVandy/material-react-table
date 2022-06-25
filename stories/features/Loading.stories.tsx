import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, { MaterialReactTableProps } from '../../src';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Loading Examples',
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

export const LoadingExample: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable columns={columns} data={[]} state={{ isLoading: true }} />
);

export const SkeletonDisplayColumns: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={[]}
    enableRowSelection
    enableRowNumbers
    enableExpanding
    enableRowActions
    state={{ showSkeletons: true }}
  />
);

export const ReloadingExample: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    state={{ showProgressBars: true }}
  />
);
