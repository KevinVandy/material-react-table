import { type MRT_ColumnDef, MaterialReactTable } from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Styling/Custom Column Widths',
};

export default meta;

const columns: MRT_ColumnDef<(typeof data)[0]>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 50,
  },
  {
    accessorKey: 'firstName',
    header: 'First Name',
    size: 300,
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
    size: 100,
  },
  {
    accessorKey: 'age',
    header: 'Age',
    size: 50,
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
];
const data = [...Array(21)].map(() => ({
  address: faker.location.streetAddress(),
  age: faker.number.int(80),
  firstName: faker.person.firstName(),
  id: faker.number.int(100),
  lastName: faker.person.lastName(),
}));

export const CustomWidths = () => (
  <MaterialReactTable columns={columns} data={data} />
);

export const CustomWidthsGrid = () => (
  <MaterialReactTable columns={columns} data={data} layoutMode="grid" />
);

export const SmallWidths = () => (
  <MaterialReactTable
    columns={columns.map((c) => ({ ...c, minSize: 10, size: 10 }))}
    data={data}
    layoutMode="grid"
  />
);
