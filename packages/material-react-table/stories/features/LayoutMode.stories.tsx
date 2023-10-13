import { type MRT_ColumnDef, MaterialReactTable } from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Features/Layout Mode Examples',
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

export const DefaultSemantic = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableColumnOrdering
    enableRowSelection
    layoutMode="semantic"
  />
);

export const Grid = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableColumnOrdering
    enableRowSelection
    layoutMode="grid"
  />
);

export const GridNoGrow = () => (
  <MaterialReactTable
    columns={columns.slice(0, 2)}
    data={data}
    enableColumnOrdering
    enableRowSelection
    layoutMode="grid-no-grow"
  />
);

export const GridWithResizing = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableColumnOrdering
    enableColumnResizing
    enableRowSelection
    layoutMode="grid"
  />
);

export const GridNoGrowWithResizing = () => (
  <MaterialReactTable
    columns={columns.slice(0, 2)}
    data={data}
    enableColumnOrdering
    enableColumnResizing
    enableRowSelection
    layoutMode="grid-no-grow"
  />
);
