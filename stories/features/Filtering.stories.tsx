import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, {
  MaterialReactTableProps,
  MRT_ColumnDef,
} from '../../src';
import { faker } from '@faker-js/faker';
import { MenuItem, TextField } from '@mui/material';

const meta: Meta = {
  title: 'Features/Filtering Examples',
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

const data = [...Array(100)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number(100),
  gender: faker.name.gender(true),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
}));

export const FilteringEnabledDefault: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable columns={columns} data={data} manualFiltering />
);

export const FilteringEnabledAndShown: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    initialState={{ showFilters: true }}
  />
);

export const ColumnFilteringDisabled: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableColumnFilters={false}
  />
);

export const FilteringDisabled: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable columns={columns} data={data} enableFilters={false} />
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
        filterFn: 'startsWith',
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
        enabledColumnFilterOptions: ['startsWith', 'endsWith'],
        filterFn: 'startsWith',
      },
      {
        header: 'Age',
        id: 'age',
      },
      {
        header: 'Gender',
        id: 'gender',
        enabledColumnFilterOptions: ['equals', 'notEquals'],
        filterFn: 'equals',
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
        enableColumnFilter: false,
      },
      {
        header: 'Gender',
        id: 'gender',
      },
      {
        header: 'Address',
        id: 'address',
        enableColumnFilter: false,
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

export const CustomFilterFunctions: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    initialState={{ showFilters: true }}
    // filterFns={{
    //   fuzzy: (row, columnId, value, addMeta) => {
    //     console.log('fuzzy');
    //   },
    //   contains: (row, columnId, value, addMeta) => {
    //     console.log('contains');
    //   },
    // }}
  />
);

export const CustomFilterFunctionPerColumn: Story<
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
      },
      {
        header: 'Gender',
        id: 'gender',
        filterFn: (row, _columnIds, filterValue) =>
          row
            .getValue('gender')
            .toLowerCase()
            .startsWith(filterValue.toLowerCase()),
      },
      {
        header: 'Address',
        id: 'address',
      },
      {
        header: 'State',
        id: 'state',
        filterFn: (row, _columnIds, filterValue) =>
          row
            .getValue('state')
            .toLowerCase()
            .startsWith(filterValue.toLowerCase()),
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
        Filter: ({ header }) => (
          <TextField
            onChange={(e) =>
              header.column.setFilterValue(e.target.value || undefined)
            }
            select
            value={header.column.getFilterValue() ?? ''}
            margin="dense"
            placeholder="Filter"
            variant="standard"
            fullWidth
          >
            {/*@ts-ignore*/}
            <MenuItem value={null}>All</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
        ),
        filterFn: (row, _columnIds, filterValue) =>
          row.getValue('gender').toLowerCase() === filterValue.toLowerCase(),
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

export const ManualFiltering: Story<MaterialReactTableProps> = () => {
  const [rows, setRows] = useState(() => data);

  return (
    <MaterialReactTable
      columns={columns}
      data={rows}
      manualFiltering
      enabledColumnFilterOptions={null}
      onColumnFilterValueChanged={({ column, event, filterValue }) => {
        const filteredRows = data.filter((dataRow) =>
          dataRow[column.id]
            .toLowerCase()
            .startsWith(filterValue.toLowerCase()),
        );
        setRows(filteredRows);
      }}
    />
  );
};
