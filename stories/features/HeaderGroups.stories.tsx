import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, { MaterialReactTableProps } from '../../src';
import faker from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Header Groups Examples',
};

export default meta;

export const HeaderGroups: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={[
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName' as const,
          },

          {
            Header: 'Last Name',
            accessor: 'lastName' as const,
          },
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Age',
            accessor: 'age' as const,
          },
          {
            Header: 'Address',
            accessor: 'address' as const,
          },
        ],
      },
    ]}
    data={[...Array(5)].map((_) => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      age: faker.datatype.number(80),
      address: faker.address.streetAddress(),
    }))}
  />
);

export const HeaderAndFooterGroups: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={[
      {
        Header: 'Name',
        Footer: 'Name',
        columns: [
          {
            Header: 'First Name',
            Footer: 'First Name',
            accessor: 'firstName' as const,
          },

          {
            Header: 'Last Name',
            Footer: 'Last Name',
            accessor: 'lastName' as const,
          },
        ],
      },
      {
        Header: 'Info',
        Footer: 'Info',
        columns: [
          {
            Header: 'Age',
            Footer: 'Age',
            accessor: 'age' as const,
          },
          {
            Header: 'Address',
            Footer: 'Address',
            accessor: 'address' as const,
          },
        ],
      },
    ]}
    data={[...Array(5)].map((_) => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      age: faker.datatype.number(80),
      address: faker.address.streetAddress(),
    }))}
  />
);
