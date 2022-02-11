import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, { MaterialReactTableProps } from '../../src';
import faker from '@faker-js/faker';
import { MenuItem, TextField } from '@mui/material';

const meta: Meta = {
  title: 'Features/Filtering Examples',
  parameters: {
    status: {
      type: 'beta',
    },
  },
};

export default meta;

const columns = [
  {
    Header: 'First Name',
    accessor: 'firstName' as const,
  },
  {
    Header: 'Last Name',
    accessor: 'lastName' as const,
  },
  {
    Header: 'Age',
    accessor: 'age' as const,
  },
  {
    Header: 'Gender',
    accessor: 'gender' as const,
  },
  {
    Header: 'Address',
    accessor: 'address' as const,
  },
  {
    Header: 'State',
    accessor: 'state' as const,
  },
];

const data = [...Array(100)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number(100),
  gender: faker.name.gender(true),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
}));

export const FilteringEnabledDefault: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable columns={columns} data={data} />
);

export const FilteringEnabledAndShown: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable columns={columns} data={data} defaultShowFilters />
);

export const FilteringDisabled: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable columns={columns} data={data} disableFilters />
);

export const FilteringDisabledForCertainColumns: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={[
      {
        Header: 'First Name',
        accessor: 'firstName' as const,
      },
      {
        Header: 'Last Name',
        accessor: 'lastName' as const,
      },
      {
        Header: 'Age',
        accessor: 'age' as const,
        disableFilters: true,
      },
      {
        Header: 'Gender',
        accessor: 'gender' as const,
      },
      {
        Header: 'Address',
        accessor: 'address' as const,
        disableFilters: true,
      },
      {
        Header: 'State',
        accessor: 'state' as const,
      },
    ]}
    data={data}
    defaultShowFilters
  />
);

export const CustomFilterFunction: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={[
      {
        Header: 'First Name',
        accessor: 'firstName' as const,
      },
      {
        Header: 'Last Name',
        accessor: 'lastName' as const,
      },
      {
        Header: 'Age',
        accessor: 'age' as const,
      },
      {
        Header: 'Gender',
        accessor: 'gender' as const,
        filter: (rows, _columnIds, filterValue) =>
          rows.filter((row) =>
            row.values['gender'].toLowerCase().startsWith(filterValue.toLowerCase()),
          ),
      },
      {
        Header: 'Address',
        accessor: 'address' as const,
      },
      {
        Header: 'State',
        accessor: 'state' as const,
        filter: (rows, _columnIds, filterValue) =>
          rows.filter((row) =>
            row.values['state'].toLowerCase().startsWith(filterValue.toLowerCase()),
          ),
      },
    ]}
    data={data}
    defaultShowFilters
  />
);

export const CustomFilterComponent: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={[
      {
        Header: 'First Name',
        accessor: 'firstName' as const,
      },
      {
        Header: 'Last Name',
        accessor: 'lastName' as const,
      },
      {
        Header: 'Age',
        accessor: 'age' as const,
      },
      {
        Header: 'Gender',
        accessor: 'gender' as const,
        Filter: ({ column }) => (
          <TextField
            onChange={(e) => column.setFilter(e.target.value || undefined)}
            select
            value={column.filterValue ?? ''}
            placeholder="Filter"
            variant="standard"
            fullWidth
          >
            <MenuItem value=""></MenuItem>
            <MenuItem value="Male">M</MenuItem>
            <MenuItem value="Female">F</MenuItem>
          </TextField>
        ),
        filter: (rows, _columnIds, filterValue) =>
          rows.filter((row) => row.values['gender'].toLowerCase() === filterValue.toLowerCase()),
      },
      {
        Header: 'Address',
        accessor: 'address' as const,
      },
      {
        Header: 'State',
        accessor: 'state' as const,
      },
    ]}
    data={data}
    defaultShowFilters
  />
);
