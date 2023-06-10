import { type Meta } from '@storybook/react';
import { MaterialReactTable, type MRT_ColumnDef } from '../../src';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Styling/Custom Column Widths',
};

export default meta;

const columns: MRT_ColumnDef<(typeof data)[0]>[] = [
  {
    header: 'ID',
    accessorKey: 'id',
    size: 50,
  },
  {
    header: 'First Name',
    accessorKey: 'firstName',
    size: 300,
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
    size: 100,
  },
  {
    header: 'Age',
    accessorKey: 'age',
    size: 50,
  },
  {
    header: 'Address',
    accessorKey: 'address',
  },
];
const data = [...Array(21)].map(() => ({
  id: faker.datatype.number(100),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  age: faker.datatype.number(80),
  address: faker.location.streetAddress(),
}));

export const CustomWidths = () => (
  <MaterialReactTable columns={columns} data={data} />
);

export const CustomWidthsGrid = () => (
  <MaterialReactTable columns={columns} data={data} layoutMode="grid" />
);

export const SmallWidths = () => (
  <MaterialReactTable
    columns={columns.map((c) => ({ ...c, size: 10, minSize: 10 }))}
    data={data}
    layoutMode="grid"
  />
);
