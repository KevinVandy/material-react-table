import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';
import { type MRT_ColumnDef } from '../../src';
import { MaterialReactServerTable } from '../../src/components/MaterialReactServerTable';

const meta: Meta = {
  title: 'Features/Server Table',
};

export default meta;

type Person = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  city: string;
};

const fakeDatabase: Person[] = [...Array(100)].map(() => ({
  id: faker.string.uuid(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  age: faker.number.int({ min: 18, max: 65 }),
  email: faker.internet.email(),
  city: faker.location.city(),
}));

const columns: MRT_ColumnDef<Person>[] = [
  { accessorKey: 'firstName', header: 'First Name' },
  { accessorKey: 'lastName', header: 'Last Name' },
  { accessorKey: 'age', header: 'Age' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'city', header: 'City' },
];

const simulateDelay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const Basic = () => (
  <MaterialReactServerTable<Person>
    loadConfig={async () => {
      await simulateDelay(800);
      return { columns };
    }}
    loadData={async (state) => {
      await simulateDelay(600);
      const { pageIndex, pageSize } = state.pagination;
      const start = pageIndex * pageSize;
      return {
        data: fakeDatabase.slice(start, start + pageSize),
        rowCount: fakeDatabase.length,
      };
    }}
    saveState={async () => {
      await simulateDelay(200);
    }}
  />
);

export const WithInitialState = () => (
  <MaterialReactServerTable<Person>
    loadConfig={async () => {
      await simulateDelay(800);
      return {
        columns,
        initialState: {
          pagination: { pageIndex: 0, pageSize: 5 },
          density: 'comfortable',
        },
      };
    }}
    loadData={async (state) => {
      await simulateDelay(600);
      const { pageIndex, pageSize } = state.pagination;
      const start = pageIndex * pageSize;
      return {
        data: fakeDatabase.slice(start, start + pageSize),
        rowCount: fakeDatabase.length,
      };
    }}
    saveState={async () => {
      await simulateDelay(200);
    }}
  />
);

export const WithConfigError = () => (
  <MaterialReactServerTable<Person>
    loadConfig={async () => {
      await simulateDelay(800);
      throw new Error('Failed to load config');
    }}
    loadData={async () => ({
      data: [],
      rowCount: 0,
    })}
    saveState={async () => {}}
  />
);
