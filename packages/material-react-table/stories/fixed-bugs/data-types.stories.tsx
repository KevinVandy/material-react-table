import { type MRT_ColumnDef, MaterialReactTable } from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Fixed Bugs/Data Types',
};

export default meta;

type Person = {
  address: string;
  city: string;
  firstName: null | string;
  lastName: string;
  state: string;
  states: string[];
};

const columns: MRT_ColumnDef<Person>[] = [
  {
    accessorKey: 'firstName',
    enableGlobalFilter: true,
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
    Cell: ({ cell }) => cell.getValue<string[]>().join(', '),
    accessorKey: 'states',
    header: 'States',
  },
];

const data = [...Array(66)].map(() => ({
  address: faker.location.streetAddress(),
  city: faker.location.city(),
  firstName: Math.random() > 0.5 ? faker.person.firstName() : null,
  lastName: faker.person.lastName(),
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
