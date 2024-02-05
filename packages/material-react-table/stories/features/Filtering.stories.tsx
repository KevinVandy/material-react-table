import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import {
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  MaterialReactTable,
} from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Features/Filtering Examples',
};

export default meta;

const columns: MRT_ColumnDef<(typeof data)[0]>[] = [
  {
    Cell: ({ cell }) => (cell.getValue() ? 'Yes' : 'No'),
    accessorKey: 'isActive',
    header: 'Is Active',
    size: 110,
  },
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'age',
    filterVariant: 'range',
    header: 'Age',
  },
  {
    Cell: ({ cell }) => cell.getValue<Date>().toLocaleDateString(), //transform data to readable format for cell render
    accessorFn: (row) => new Date(row.birthDate), //transform data before processing so sorting works
    filterFn: 'lessThan',
    filterVariant: 'date',
    header: 'Birth Date',
    id: 'birthDate',
  },
  {
    accessorKey: 'gender',
    header: 'Gender',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'state',
    filterSelectOptions: [
      { label: 'AL', value: 'Alabama' },
      { label: 'AZ', value: 'Arizona' },
      { label: 'CA', value: 'California' },
      { label: 'FL', value: 'Florida' },
      { label: 'GA', value: 'Georgia' },
      { label: 'NY', value: 'New York' },
      { label: 'TX', value: 'Texas' },
    ],
    filterVariant: 'multi-select',
    header: 'State',
  },
];

const data = [...Array(120)].map(() => ({
  address: faker.location.streetAddress(),
  age: faker.number.int(100),
  arrivalTime: faker.date.recent(),
  birthDate: faker.date.birthdate({ max: 2020, min: 1980 }),
  departureTime: faker.date.recent(),
  firstName: faker.person.firstName(),
  gender: Math.random() < 0.8 ? faker.person.sex() : faker.person.gender(),
  hireDate: faker.date.birthdate({ max: 2024, min: 2011 }),
  isActive: faker.datatype.boolean(),
  lastName: faker.person.lastName(),
  state: faker.location.state(),
}));

export const FilteringEnabledDefault = () => (
  <MaterialReactTable columns={columns} data={data} />
);

export const PopoverDisplayMode = () => (
  <MaterialReactTable
    columnFilterDisplayMode="popover"
    columns={columns}
    data={data}
  />
);

export const PopoverDisplayModeNoSorting = () => (
  <MaterialReactTable
    columnFilterDisplayMode="popover"
    columns={columns}
    data={data}
    enableSorting={false}
  />
);

export const ColumnFilteringDisabled = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableColumnFilters={false}
  />
);

export const FilteringDisabled = () => (
  <MaterialReactTable columns={columns} data={data} enableFilters={false} />
);

export const FilterHighlightingDisabled = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableFilterMatchHighlighting={false}
  />
);

export const FilterFnAndFilterVariants = () => (
  <MaterialReactTable
    columns={[
      {
        Cell: ({ cell }) => (cell.getValue() === 'true' ? 'Yes' : 'No'),
        accessorFn: (originalRow) => (originalRow.isActive ? 'true' : 'false'),
        filterVariant: 'checkbox',
        header: 'Is Active',
        id: 'isActive',
        size: 200,
      },
      {
        accessorKey: 'firstName',
        filterFn: 'fuzzy', // default
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        filterFn: 'contains',
        header: 'Last Name',
      },
      {
        accessorKey: 'age',
        filterVariant: 'range',
        header: 'Age',
      },
      {
        Cell: ({ cell }) => cell.getValue<Date>().toLocaleDateString(), //transform data to readable format for cell render
        accessorFn: (row) => new Date(row.birthDate), //transform data before processing so sorting works
        filterFn: 'lessThan',
        filterVariant: 'date',
        header: 'Birth Date',
        id: 'birthDate',
      },
      {
        Cell: ({ cell }) => cell.getValue<Date>().toLocaleDateString(), //transform data to readable format for cell render
        accessorFn: (row) => new Date(row.hireDate), //transform data before processing so sorting works
        filterVariant: 'date-range',
        header: 'Hire Date',
        id: 'hireDate',
      },
      {
        Cell: ({ cell }) => cell.getValue<Date>().toLocaleString(), //transform data to readable format for cell render
        accessorFn: (row) => new Date(row.arrivalTime), //transform data before processing so sorting works
        filterVariant: 'datetime-range',
        header: 'Arrival time',
        id: 'arrivalTime',
      },
      {
        Cell: ({ cell }) => cell.getValue<Date>().toLocaleString(), //transform data to readable format for cell render
        accessorFn: (row) => new Date(row.departureTime), //transform data before processing so sorting works
        filterVariant: 'time-range',
        header: 'Departure Time',
        id: 'departureTime',
      },
      {
        accessorKey: 'gender',
        filterSelectOptions: ['Male', 'Female', 'Other'],
        filterVariant: 'select',
        header: 'Gender',
      },
      {
        accessorKey: 'address',
        filterFn: 'includesStringSensitive',
        header: 'Address',
      },
      {
        accessorKey: 'state',
        filterSelectOptions: [
          { label: 'AL', value: 'Alabama' },
          { label: 'AZ', value: 'Arizona' },
          { label: 'CA', value: 'California' },
          { label: 'FL', value: 'Florida' },
          { label: 'GA', value: 'Georgia' },
          { label: 'NY', value: 'New York' },
          { label: 'TX', value: 'Texas' },
        ],
        filterVariant: 'multi-select',
        header: 'State',
      },
    ]}
    data={data}
    initialState={{ showColumnFilters: true }}
  />
);

export const FilterFnAndFilterVariantsFaceted = () => (
  <MaterialReactTable
    columns={[
      {
        accessorKey: 'firstName',
        filterSelectOptions: data.map((row) => ({
          label: row.firstName.toUpperCase().split('').reverse().join(''),
          value: row.firstName,
        })), //hard coded
        filterVariant: 'autocomplete',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        filterVariant: 'autocomplete', //faceted auto generated select options
        header: 'Last Name',
      },
      {
        accessorKey: 'age',
        filterVariant: 'range-slider',
        header: 'Age',
      },
      {
        accessorKey: 'gender',
        filterVariant: 'select',
        header: 'Gender',
      },
      {
        accessorKey: 'state',
        filterVariant: 'multi-select',
        header: 'State',
      },
    ]}
    data={data}
    enableFacetedValues
    initialState={{ showColumnFilters: true }}
  />
);

export const FilteringChangeModeEnabled = () => (
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
        accessorKey: 'age',
        filterFn: 'between',
        header: 'Age',
      },
      {
        Cell: ({ cell }) => cell.getValue<Date>().toLocaleDateString(), //transform data to readable format for cell render
        accessorFn: (row) => new Date(row.birthDate), //transform data before processing so sorting works
        filterVariant: 'date',
        header: 'Birth Date',
        id: 'birthDate',
      },
      {
        accessorKey: 'gender',
        filterSelectOptions: ['Male', 'Female', 'Other'],
        header: 'Gender',
      },
      {
        accessorKey: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'state',
        header: 'State',
      },
    ]}
    data={data}
    enableColumnFilterModes
    initialState={{ showColumnFilters: true }}
  />
);

export const FilteringChangeModeEnabledFaceted = () => (
  <MaterialReactTable
    columns={[
      {
        accessorKey: 'firstName',
        filterFn: 'fuzzy', // default
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        filterVariant: 'autocomplete',
        header: 'Last Name',
      },
      {
        accessorKey: 'age',
        filterVariant: 'range-slider',
        header: 'Age',
      },
      {
        accessorKey: 'gender',
        filterVariant: 'select',
        header: 'Gender',
      },
      {
        accessorKey: 'state',
        filterVariant: 'multi-select',
        header: 'State',
      },
    ]}
    data={data}
    enableColumnFilterModes
    enableFacetedValues
    initialState={{ showColumnFilters: true }}
  />
);

export const FilteringChangeModeEnabledHidden = () => (
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
        accessorKey: 'age',
        filterFn: 'between',
        header: 'Age',
      },
      {
        accessorKey: 'gender',
        filterSelectOptions: ['Male', 'Female', 'Other'],
        header: 'Gender',
      },
      {
        accessorKey: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'state',
        header: 'State',
      },
    ]}
    data={data}
    enableColumnFilterModes
  />
);

export const DisableSomeFilterTypesForCertainColumns = () => (
  <MaterialReactTable
    columns={[
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        columnFilterModeOptions: [
          'startsWith',
          'endsWith',
          'empty',
          'notEmpty',
        ],
        filterFn: 'startsWith',
        header: 'Last Name',
      },
      {
        accessorKey: 'age',
        header: 'Age',
      },
      {
        accessorKey: 'gender',
        columnFilterModeOptions: ['equals', 'notEquals'],
        filterFn: 'equals',
        header: 'Gender',
      },
      {
        accessorKey: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'state',
        header: 'State',
      },
    ]}
    data={data}
    enableColumnFilterModes
    initialState={{ showColumnFilters: true }}
  />
);

export const FilteringDisabledForCertainColumns = () => (
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
        accessorKey: 'age',
        enableColumnFilter: false,
        header: 'Age',
      },
      {
        accessorKey: 'gender',
        header: 'Gender',
      },
      {
        accessorKey: 'address',
        enableColumnFilter: false,
        header: 'Address',
      },
      {
        accessorKey: 'state',
        header: 'State',
      },
    ]}
    data={data}
    initialState={{ showColumnFilters: true }}
  />
);

export const CustomFilterFunctionPerColumn = () => (
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
        accessorKey: 'age',
        header: 'Age',
      },
      {
        accessorKey: 'gender',
        filterFn: (row, _columnIds, filterValue) =>
          row
            .getValue<string>('gender')
            .toLowerCase()
            .startsWith(filterValue.toLowerCase()),
        header: 'Gender',
      },
      {
        accessorKey: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'state',
        filterFn: (row, _columnIds, filterValue) =>
          row
            .getValue<string>('state')
            .toLowerCase()
            .startsWith(filterValue.toLowerCase()),
        header: 'State',
      },
    ]}
    data={data}
    initialState={{ showColumnFilters: true }}
  />
);

export const CustomFilterFns = () => (
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
        accessorKey: 'age',
        header: 'Age',
      },
      {
        accessorKey: 'gender',
        filterFn: 'customFn',
        header: 'Gender',
      },
      {
        accessorKey: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'state',
        filterFn: 'customFn',
        header: 'State',
      },
    ]}
    data={data}
    filterFns={{
      customFn: (row, _columnIds, filterValue) => {
        console.info('customFn', row, _columnIds, filterValue);
        return row
          .getValue<string>('state')
          .toLowerCase()
          .startsWith(filterValue.toLowerCase());
      },
    }}
    initialState={{ showColumnFilters: true }}
  />
);

export const CustomFilterComponent = () => (
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
        accessorKey: 'age',
        header: 'Age',
      },
      {
        Filter: ({ header }) => (
          <TextField
            fullWidth
            margin="none"
            onChange={(e) =>
              header.column.setFilterValue(e.target.value || undefined)
            }
            placeholder="Filter"
            select
            value={header.column.getFilterValue() ?? ''}
            variant="standard"
          >
            {/*@ts-ignore*/}
            <MenuItem value={null}>All</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
        ),
        accessorKey: 'gender',
        filterFn: (row, _columnIds, filterValue) =>
          row.getValue<string>('gender').toLowerCase() ===
          filterValue.toLowerCase(),
        header: 'Gender',
      },
      {
        accessorKey: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'state',
        header: 'State',
      },
    ]}
    data={data}
    initialState={{ showColumnFilters: true }}
  />
);

export const CustomizeFilterTextFields = () => (
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
        accessorKey: 'age',
        header: 'Age',
      },
      {
        accessorKey: 'gender',
        filterSelectOptions: ['Male', 'Female', 'Other'],
        filterVariant: 'select',
        header: 'Gender',
      },
      {
        accessorKey: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'state',
        header: 'State',
      },
    ]}
    data={data}
    initialState={{ showColumnFilters: true }}
    muiFilterTextFieldProps={{ variant: 'outlined' }}
  />
);

export const ManualFiltering = () => {
  const [rows, setRows] = useState(() => [...data]);
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    [],
  );

  //this kind of logic would actually live on a server, not client-side
  useEffect(() => {
    if (columnFilters?.length) {
      let filteredRows = [...data];
      columnFilters.map((filter) => {
        const { id: columnId, value: filterValue } = filter;
        filteredRows = filteredRows.filter((row) => {
          return row[columnId as keyof typeof row]
            ?.toString()
            ?.toLowerCase()
            ?.includes?.((filterValue as string).toLowerCase());
        });
      });
      setRows(filteredRows);
    } else {
      setRows([...data]);
    }
  }, [columnFilters]);

  return (
    <MaterialReactTable
      columnFilterModeOptions={null}
      columns={columns}
      data={rows}
      manualFiltering
      onColumnFiltersChange={setColumnFilters}
      state={{ columnFilters }}
    />
  );
};

export const ExternalSetFilterValue = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    initialState={{ showColumnFilters: true }}
    renderTopToolbarCustomActions={({ table }) => (
      <Box>
        <Button
          onClick={() =>
            table.setColumnFilters((prev) => [
              ...prev,
              { id: 'firstName', value: 'Joe' },
            ])
          }
        >
          Find Joes
        </Button>
        <Button
          onClick={() =>
            table.setColumnFilters((prev) => [
              ...prev,
              { id: 'age', value: [18, 25] },
            ])
          }
        >
          Find 18-25 Age Range
        </Button>
        <Button onClick={() => table.resetColumnFilters()}>
          Reset Filters
        </Button>
      </Box>
    )}
  />
);

export const InitialFilters = () => (
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
        accessorKey: 'age',
        filterFn: 'between',
        header: 'Age',
      },
      {
        accessorKey: 'gender',
        filterSelectOptions: ['Male', 'Female', 'Other'],
        header: 'Gender',
      },
      {
        accessorKey: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'state',
        header: 'State',
      },
    ]}
    data={data}
    enableColumnFilterModes
    initialState={{
      columnFilters: [
        { id: 'firstName', value: 'Jo' },
        { id: 'age', value: [18, 100] },
      ],
    }}
  />
);
