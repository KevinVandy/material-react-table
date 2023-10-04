import {
  type MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Features/Click to Copy Examples',
};

export default meta;

interface Person {
  address: string;
  city: string;
  email: string;
  name: {
    firstName: string;
    lastName: string;
  };
  state: string;
}

const columns: MRT_ColumnDef<Person>[] = [
  {
    accessorKey: 'name.firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'name.lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'email',
    header: 'Email Address',
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
];

const data: Person[] = [...Array(100)].map(() => ({
  address: faker.location.streetAddress(),
  city: faker.location.city(),
  email: faker.internet.email(),
  name: {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  },
  state: faker.location.state(),
}));

export const ClickToCopyEnabled = () => {
  const table = useMaterialReactTable({
    columns,
    data,
    enableClickToCopy: true,
  });
  return <MaterialReactTable table={table} />;
};

export const ClickToCopyEnabledWithColumnResizing = () => {
  const table = useMaterialReactTable({
    columns,
    data,
    enableClickToCopy: true,
    enableColumnResizing: true,
  });

  return <MaterialReactTable table={table} />;
};

export const ClickToCopyEnabledPerColumn = () => {
  const table = useMaterialReactTable({
    columns: [
      {
        accessorKey: 'name.firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'name.lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'email',
        enableClickToCopy: true,
        header: 'Email Address',
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
    ],
    data,
  });

  return <MaterialReactTable table={table} />;
};

export const ClickToCopyDisabledPerColumn = () => {
  const table = useMaterialReactTable({
    columns: [
      {
        accessorKey: 'name.firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'name.lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'email',
        enableClickToCopy: false,
        header: 'Email Address',
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
    ],
    data,
  });

  return <MaterialReactTable table={table} />;
};
