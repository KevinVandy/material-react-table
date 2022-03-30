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
    header: 'Gender',
    id: 'gender',
  },
  {
    header: 'Address',
    id: 'address',
  },
  {
    header: 'State',
    id: 'state',
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
        filter: 'startsWith',
      },
      {
        header: 'Gender',
        id: 'gender',
        filterSelectOptions: ['Male', 'Female', 'Other'],
      },
      {
        header: 'Address',
        id: 'address',
      },
      {
        header: 'State',
        id: 'state',
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

export const DisableSomeFilterTypesForCertainColumns: Story<
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
        enabledFilterTypes: ['startsWith', 'endsWith'],
        filter: 'startsWith',
      },
      {
        header: 'Age',
        id: 'age',
      },
      {
        header: 'Gender',
        id: 'gender',
        enabledFilterTypes: ['equals', 'notEquals'],
        filter: 'equals',
      },
      {
        header: 'Address',
        id: 'address',
      },
      {
        header: 'State',
        id: 'state',
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
        disableFilters: true,
      },
      {
        header: 'Gender',
        id: 'gender',
      },
      {
        header: 'Address',
        id: 'address',
        disableFilters: true,
      },
      {
        header: 'State',
        id: 'state',
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
        header: 'Gender',
        id: 'gender',
        filter: (rows, _columnIds, filterValue) =>
          rows.filter((row) =>
            row.values['gender']
              .toLowerCase()
              .startsWith(filterValue.toLowerCase()),
          ),
      },
      {
        header: 'Address',
        id: 'address',
      },
      {
        header: 'State',
        id: 'state',
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
        header: 'Gender',
        id: 'gender',
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
        header: 'Address',
        id: 'address',
      },
      {
        header: 'State',
        id: 'state',
      },
    ]}
    data={data}
    initialState={{ showFilters: true }}
  />
);
