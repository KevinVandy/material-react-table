import { type Meta } from '@storybook/react';
import { MaterialReactTable, type MRT_ColumnDef } from '../../src';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Fixed Bugs/Data Types',
};

export default meta;

type Person = {
  firstName: string | null;
  lastName: string;
  address: string;
  city: string;
  state: string;
  states: string[];
};

const columns: MRT_ColumnDef<Person>[] = [
  {
    accessorKey: 'firstName',
    header: 'First Name',
    enableGlobalFilter: true,
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
    accessorKey: 'states',
    header: 'States',
    Cell: ({ cell }) => cell.getValue<string[]>().join(', '),
  },
];

const data = [...Array(66)].map(() => ({
  firstName: Math.random() > 0.5 ? faker.person.firstName() : null,
  lastName: faker.person.lastName(),
  address: faker.location.streetAddress(),
  city: faker.location.city(),
  state: faker.location.state(),
  states: [
    faker.location.state(),
    faker.location.state(),
    faker.location.state(),
  ],
}));

export const NullColumn = () => {
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableGlobalFilterModes
      initialState={{ showGlobalFilter: true }}
    />
  );
};
