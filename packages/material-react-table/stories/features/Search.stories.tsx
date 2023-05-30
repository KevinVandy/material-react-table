import { type Meta } from '@storybook/react';
import { MaterialReactTable, type MRT_ColumnDef } from '../../src';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Search Examples',
};

export default meta;

const columns: MRT_ColumnDef<(typeof data)[0]>[] = [
  {
    header: 'First Name',
    accessorKey: 'firstName',
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
  },
  {
    header: 'Age',
    accessorKey: 'age',
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

const data = [...Array(200)].map(() => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  phoneNumber: faker.phone.number(),
  age: +faker.datatype.float({ min: 0, max: 100 }),
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
    enableRowNumbers
    enableGlobalFilterRankedResults={false}
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
    initialState={{ showGlobalFilter: true }}
    enableToolbarInternalActions={false}
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
      variant: 'outlined',
      placeholder: 'Search 100 rows',
      label: 'Search',
      InputLabelProps: { shrink: true },
    }}
  />
);
