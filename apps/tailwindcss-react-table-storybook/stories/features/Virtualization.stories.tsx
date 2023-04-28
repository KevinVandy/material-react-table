import React from 'react';
import { Meta } from '@storybook/react';
import TailwindCSSReactTable, {
  type TRT_ColumnDef,
} from 'tailwindcss-react-table';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Virtualization',
};

export default meta;

const longColumns: TRT_ColumnDef[] = [
  {
    header: 'First Name',
    accessorKey: 'firstName',
  },
  {
    header: 'Middle Name',
    accessorKey: 'middleName',
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
  },
  {
    header: 'Email Address',
    accessorKey: 'email',
    size: 300,
  },
  {
    header: 'Phone Number',
    accessorKey: 'phoneNumber',
  },
  {
    header: 'Address',
    accessorKey: 'address',
  },
  {
    header: 'Zip Code',
    accessorKey: 'zipCode',
  },
  {
    header: 'City',
    accessorKey: 'city',
  },
  {
    header: 'State',
    accessorKey: 'state',
  },
  {
    header: 'Country',
    accessorKey: 'country',
    size: 200,
  },
  {
    header: 'Favorite Color',
    accessorKey: 'favoriteColor',
  },
  {
    header: 'Favorite Quote',
    accessorKey: 'favoriteQuote',
    size: 700,
  },
  {
    header: 'Pet Name',
    accessorKey: 'petName',
  },
  {
    header: 'Pet Type',
    accessorKey: 'petType',
  },
];

const longData = [...Array(500)].map(() => ({
  firstName: faker.name.firstName(),
  middleName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  phoneNumber: faker.phone.number(),
  address: faker.address.streetAddress(),
  zipCode: faker.address.zipCode(),
  city: faker.address.city(),
  state: faker.address.state(),
  country: faker.address.country(),
  favoriteQuote: faker.lorem.sentence(),
  favoriteColor: faker.internet.color(),
  petName: faker.animal.cat(),
  petType: faker.animal.type(),
}));

export const EnableRowVirtualizationDense = () => (
  <TailwindCSSReactTable
    columns={longColumns}
    data={longData}
    enablePagination={false}
    enableRowNumbers
    enableRowVirtualization
    enableBottomToolbar={false}
    initialState={{ density: 'compact' }}
  />
);

export const EnableRowVirtualizationComfortable = () => (
  <TailwindCSSReactTable
    columns={longColumns}
    data={longData}
    enablePagination={false}
    enableRowNumbers
    enableRowVirtualization
    enableBottomToolbar={false}
  />
);

export const EnableRowVirtualizationSpacious = () => (
  <TailwindCSSReactTable
    columns={longColumns}
    data={longData}
    enablePagination={false}
    enableRowNumbers
    enableRowVirtualization
    enableBottomToolbar={false}
    initialState={{ density: 'spacious' }}
  />
);

export const EnableRowVirtualizationTallContent = () => (
  <TailwindCSSReactTable
    columns={[
      ...longColumns,
      {
        header: 'Favorite Quote',
        accessorKey: 'favoriteQuote',
      },
    ]}
    data={longData}
    enablePagination={false}
    enableRowNumbers
    enableRowVirtualization
    enableBottomToolbar={false}
  />
);

export const EnableRowVirtualizationWithColumnResizing = () => (
  <TailwindCSSReactTable
    columns={longColumns}
    data={longData}
    enableColumnResizing
    enablePagination={false}
    enableRowNumbers
    enableRowVirtualization
    enableBottomToolbar={false}
  />
);

export const EnableRowVirtualizationWithDetailPanel = () => (
  <TailwindCSSReactTable
    columns={longColumns}
    data={longData.slice(0, 100)}
    enablePagination={false}
    enableRowNumbers
    enableRowVirtualization
    enableBottomToolbar={false}
    renderDetailPanel={() => <div>Detail Panel</div>}
  />
);

export const EnableRowVirtualizationWithMemoizedCells = () => (
  <TailwindCSSReactTable
    columns={longColumns}
    data={longData}
    enableBottomToolbar={false}
    enableDensityToggle={false}
    enablePagination={false}
    enableRowNumbers
    enableRowVirtualization
    initialState={{ density: 'compact' }}
    memoMode="cells"
  />
);

export const EnableRowVirtualizationWithMemoizedRows = () => (
  <TailwindCSSReactTable
    columns={longColumns}
    data={longData}
    enableBottomToolbar={false}
    enableDensityToggle={false}
    enablePagination={false}
    enableRowNumbers
    enableRowVirtualization
    initialState={{ density: 'compact' }}
    memoMode="rows"
  />
);

export const EnableRowVirtualizationStickyFooter = () => (
  <TailwindCSSReactTable
    columns={[
      {
        header: 'First Name',
        footer: 'First Name',
        accessorKey: 'firstName',
      },
      {
        header: 'Middle Name',
        footer: 'Middle Name',
        accessorKey: 'middleName',
      },
      {
        header: 'Last Name',
        footer: 'Last Name',
        accessorKey: 'lastName',
      },
    ]}
    data={longData}
    enablePagination={false}
    enableRowNumbers
    enableRowVirtualization
    enableBottomToolbar={false}
    enableStickyFooter
  />
);

export const EnableColumnVirtualization = () => (
  <TailwindCSSReactTable
    columns={longColumns}
    data={longData.slice(0, 10)}
    enableRowNumbers
    enableColumnVirtualization
  />
);

export const EnableColumnVirtualizationWithPinning = () => (
  <TailwindCSSReactTable
    columns={longColumns}
    data={longData.slice(0, 10)}
    enableColumnVirtualization
    enablePinning
    enableRowNumbers
  />
);

export const EnableColumnVirtualizationShortColumns = () => (
  <TailwindCSSReactTable
    columns={longColumns.slice(0, 3)}
    data={longData.slice(0, 10)}
    enableRowNumbers
    enableColumnVirtualization
  />
);

export const EnableColumnVirtualizationWithFooter = () => (
  <TailwindCSSReactTable
    columns={[
      {
        header: 'First Name',
        footer: 'First Name',
        accessorKey: 'firstName',
      },
      {
        header: 'Middle Name',
        footer: 'Middle Name',
        accessorKey: 'middleName',
      },
      {
        header: 'Last Name',
        footer: 'Last Name',
        accessorKey: 'lastName',
      },
    ]}
    data={longData.slice(0, 15)}
    enableRowNumbers
    enableColumnVirtualization
  />
);

export const EnableColumnVirtualizationStickyFooter = () => (
  <TailwindCSSReactTable
    columns={[
      {
        header: 'First Name',
        footer: 'First Name',
        accessorKey: 'firstName',
      },
      {
        header: 'Middle Name',
        footer: 'Middle Name',
        accessorKey: 'middleName',
      },
      {
        header: 'Last Name',
        footer: 'Last Name',
        accessorKey: 'lastName',
      },
    ]}
    data={longData.slice(0, 50)}
    enableRowNumbers
    enableColumnVirtualization
    enableStickyFooter
  />
);

export const RowAndColumnVirtualization = () => (
  <TailwindCSSReactTable
    columns={longColumns}
    data={longData}
    enableBottomToolbar={false}
    enableColumnVirtualization
    enablePagination={false}
    enableRowNumbers
    enableRowVirtualization
  />
);

export const RowAndColumnVirtualizationWithFeatures = () => (
  <TailwindCSSReactTable
    columns={longColumns}
    data={longData}
    enableBottomToolbar={false}
    enableColumnOrdering
    enableColumnResizing
    enableColumnVirtualization
    enablePagination={false}
    enablePinning
    enableRowNumbers
    enableRowSelection
    enableRowVirtualization
  />
);

const fakeColumns = [...Array(500)].map((_, i) => {
  return {
    accessorKey: i.toString(),
    header: 'Column ' + i.toString(),
  };
});

const fakeData = [...Array(500)].map(() => ({
  ...Object.fromEntries(
    fakeColumns.map((col) => [col.accessorKey, faker.name.firstName()]),
  ),
}));

export const MaxVirtualization = () => (
  <TailwindCSSReactTable
    columns={fakeColumns}
    data={fakeData}
    enableBottomToolbar={false}
    enableColumnResizing
    enableColumnVirtualization
    enablePagination={false}
    enablePinning
    enableRowNumbers
    enableRowVirtualization
    muiTableContainerProps={{ sx: { maxHeight: 500 } }}
    muiTablePaperProps={{ sx: { m: 'auto', maxWidth: 1000 } }}
  />
);
