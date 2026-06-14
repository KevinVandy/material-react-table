import { type MRT_ColumnDef, MaterialReactTable, useMaterialReactTable } from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Fixed Bugs/Grouping RowSelection',
};

export default meta;

type Person = {
  address: string;
  city: string;
  firstName: string;
  lastName: string;
  state: string;
  gender: string;
};

const columns: MRT_ColumnDef<Person>[] = [
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
    accessorKey: 'city',
    header: 'City',
  },
  {
    accessorKey: 'state',
    header: 'State',
  },
  {
    accessorKey: 'gender',
    header: 'Gender',
  },
];

const data = [...Array(300)].map(() => ({
  address: faker.location.streetAddress(),
  city: faker.location.city(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  state: faker.location.state(),
  gender: ["Male", "Female"][faker.number.int({min: 0, max: 1})]
}));

export const GroupingRowSelection = () => {
  const table = useMaterialReactTable({
      columns,
      data,
      enableGrouping: true,
      enableRowSelection: true,
      initialState: {
        grouping: ["gender"]
      }
  })
  console.log(table.getState().rowSelection);
  return <MaterialReactTable table={table} />
};
