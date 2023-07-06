import { type Meta } from '@storybook/react';
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from '../../src';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Click to Copy Examples',
};

export default meta;

interface Person {
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  address: string;
  city: string;
  state: string;
}

const columns: MRT_ColumnDef<Person>[] = [
  {
    header: 'First Name',
    accessorKey: 'name.firstName',
  },
  {
    header: 'Last Name',
    accessorKey: 'name.lastName',
  },
  {
    header: 'Email Address',
    accessorKey: 'email',
  },
  {
    header: 'Address',
    accessorKey: 'address',
  },
  {
    header: 'City',
    accessorKey: 'city',
  },
  {
    header: 'State',
    accessorKey: 'state',
  },
];

const data: Person[] = [...Array(100)].map(() => ({
  name: {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  },
  email: faker.internet.email(),
  address: faker.location.streetAddress(),
  city: faker.location.city(),
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
        header: 'First Name',
        accessorKey: 'name.firstName',
      },
      {
        header: 'Last Name',
        accessorKey: 'name.lastName',
      },
      {
        header: 'Email Address',
        accessorKey: 'email',
        enableClickToCopy: true,
      },
      {
        header: 'Address',
        accessorKey: 'address',
      },
      {
        header: 'City',
        accessorKey: 'city',
      },
      {
        header: 'State',
        accessorKey: 'state',
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
        header: 'First Name',
        accessorKey: 'name.firstName',
      },
      {
        header: 'Last Name',
        accessorKey: 'name.lastName',
      },
      {
        header: 'Email Address',
        accessorKey: 'email',
        enableClickToCopy: false,
      },
      {
        header: 'Address',
        accessorKey: 'address',
      },
      {
        header: 'City',
        accessorKey: 'city',
      },
      {
        header: 'State',
        accessorKey: 'state',
      },
    ],
    data,
  });

  return <MaterialReactTable table={table} />;
};
