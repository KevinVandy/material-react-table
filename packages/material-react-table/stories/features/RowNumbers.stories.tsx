import { useState } from 'react';
import Button from '@mui/material/Button';
import { type MRT_ColumnDef, MaterialReactTable } from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Features/Row Number Examples',
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

const data = [...Array(100)].map(() => ({
  address: faker.location.streetAddress(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  phoneNumber: faker.phone.number(),
  state: faker.location.state(),
}));

export const enableRowNumbersStatic = () => (
  <MaterialReactTable columns={columns} data={data} enableRowNumbers />
);

export const enableRowNumbersConditionally = () => {
  const [enableRowNumbers, setEnableRowNumbers] = useState(false);
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableRowNumbers={enableRowNumbers}
      renderTopToolbarCustomActions={() => (
        <Button onClick={() => setEnableRowNumbers(!enableRowNumbers)}>
          Toggle Row Numbers
        </Button>
      )}
    />
  );
};

export const enableRowNumbersStaticGrid = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowNumbers
    layoutMode="grid"
  />
);

export const enableRowNumbersStaticGridNoGrow = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowNumbers
    layoutMode="grid-no-grow"
  />
);

export const enableRowNumbersOriginal = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowNumbers
    enableRowVirtualization
    rowNumberDisplayMode="original"
  />
);

export const enableRowNumbersOriginalVirtual = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableBottomToolbar={false}
    enablePagination={false}
    enableRowNumbers
    rowNumberDisplayMode="original"
  />
);

export const enableRowNumbersStaticVirtual = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableBottomToolbar={false}
    enablePagination={false}
    enableRowNumbers
    enableRowVirtualization
    rowNumberDisplayMode="static"
  />
);
