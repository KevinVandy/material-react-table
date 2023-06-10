import { type Meta } from '@storybook/react';
import { MaterialReactTable, type MRT_ColumnDef } from '../../src';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Row Number Examples',
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

const data = [...Array(100)].map(() => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  address: faker.location.streetAddress(),
  state: faker.location.state(),
  phoneNumber: faker.phone.number(),
}));

export const enableRowNumbersOriginal = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowNumbers
    rowNumberMode="original"
  />
);

export const enableRowNumbersStatic = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowNumbers
    enableRowVirtualization
    rowNumberMode="static"
  />
);

export const enableRowNumbersOriginalVirtual = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enablePagination={false}
    enableRowNumbers
    enableBottomToolbar={false}
    rowNumberMode="original"
  />
);

export const enableRowNumbersStaticVirtual = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enablePagination={false}
    enableRowNumbers
    enableRowVirtualization
    enableBottomToolbar={false}
    rowNumberMode="static"
  />
);
