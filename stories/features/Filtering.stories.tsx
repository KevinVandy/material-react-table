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
  <MaterialReactTable
    columns={columns}
    data={data}
    initialState={{ showFilters: true }}
  />
);

export const FilteringDisabled: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable columns={columns} data={data} disableFilters />
);

export const FilterTypes: Story<MaterialReactTableProps> = () => (
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
        filter: 'startsWith',
      },
      {
        Header: 'Gender',
        accessor: 'gender' as const,
        filterSelectOptions: ['Male', 'Female', 'Other'],
      },
      {
        Header: 'Address',
        accessor: 'address' as const,
      },
      {
        Header: 'State',
        accessor: 'state' as const,
        filterSelectOptions: [
          { text: 'CA', value: 'California' },
          { text: 'TX', value: 'Texas' },
          { text: 'NY', value: 'New York' },
          { text: 'FL', value: 'Florida' },
        ],
      },
    ]}
    data={data}
    initialState={{ showFilters: true }}
  />
);

export const FilteringDisabledForCertainColumns: Story<
  MaterialReactTableProps
> = () => (
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
    initialState={{ showFilters: true }}
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
            row.values['gender']
              .toLowerCase()
              .startsWith(filterValue.toLowerCase()),
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
            row.values['state']
              .toLowerCase()
              .startsWith(filterValue.toLowerCase()),
          ),
      },
    ]}
    data={data}
    initialState={{ showFilters: true }}
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
            margin="dense"
            placeholder="Filter"
            variant="standard"
            fullWidth
          >
            <MenuItem value={null}>All</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
        ),
        filter: (rows, _columnIds, filterValue) =>
          rows.filter(
            (row) =>
              row.values['gender'].toLowerCase() === filterValue.toLowerCase(),
          ),
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
    initialState={{ showFilters: true }}
  />
);
