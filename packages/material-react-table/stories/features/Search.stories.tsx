import { type MRT_ColumnDef, MaterialReactTable } from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Features/Search Examples',
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
    accessorKey: 'age',
    header: 'Age',
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

const data = [...Array(200)].map(() => ({
  address: faker.location.streetAddress(),
  age: +faker.number.float({ max: 100, min: 0 }),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  phoneNumber: faker.phone.number(),
  state: faker.location.state(),
}));

export const SearchEnabledDefault = () => (
  <MaterialReactTable columns={columns} data={data} />
);

export const SearchContains = () => (
  <MaterialReactTable columns={columns} data={data} globalFilterFn="contains" />
);

export const CustomGlobalFilterFn = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    filterFns={{
      myCustomFilterFn: (row, id, filterValue) =>
        row.getValue<string>(id).startsWith(filterValue),
    }}
    globalFilterFn="myCustomFilterFn"
  />
);

export const SearchGlobalFilterModes = () => (
  <MaterialReactTable columns={columns} data={data} enableGlobalFilterModes />
);

export const SearchGlobalFilterModeOptions = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableGlobalFilterModes
    globalFilterModeOptions={['asfd', 'contains', 'fuzzy']}
  />
);

export const SearchRankedResultsEnabledByDefault = () => (
  <MaterialReactTable columns={columns} data={data} enableRowNumbers />
);

export const SearchDisableRankedResults = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableGlobalFilterRankedResults={false}
    enableRowNumbers
  />
);

export const ShowSearchRightBoxByDefault = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    initialState={{ showGlobalFilter: true }}
  />
);

export const ShowSearchBoxLeftByDefault = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    initialState={{ showGlobalFilter: true }}
    positionGlobalFilter="left"
  />
);

export const ShowSearchBoxLeftByDefaultWithSelection = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowSelection
    initialState={{ showGlobalFilter: true }}
    positionGlobalFilter="left"
  />
);

export const JustASearchBox = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableToolbarInternalActions={false}
    initialState={{ showGlobalFilter: true }}
  />
);

export const SearchDisabled = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableGlobalFilter={false}
  />
);

export const CustomizeSearchTextBox = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    initialState={{ showGlobalFilter: true }}
    muiSearchTextFieldProps={{
      InputLabelProps: { shrink: true },
      label: 'Search',
      placeholder: 'Search 100 rows',
      variant: 'outlined',
    }}
  />
);
