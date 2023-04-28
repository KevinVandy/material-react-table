import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import TailwindCSSReactTable, {
  type TRT_ColumnDef,
  TRT_ColumnOrderState,
} from 'tailwindcss-react-table';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Column Ordering Examples',
};

export default meta;

const columns: TRT_ColumnDef<(typeof data)[0]>[] = [
  {
    header: 'First Name',
    accessorKey: 'firstName',
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
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

const data = [...Array(100)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  state: faker.address.state(),
}));

export const ColumnOrderingEnabled = () => (
  <TailwindCSSReactTable columns={columns} data={data} enableColumnOrdering />
);

export const ColumnOrderingDisabledPerColumn = () => (
  <TailwindCSSReactTable
    columns={[
      {
        header: 'First Name',
        accessorKey: 'firstName',
      },
      {
        header: 'Last Name',
        accessorKey: 'lastName',
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
        enableColumnOrdering: false,
      },
    ]}
    data={data}
    enableColumnOrdering
  />
);

export const ColumnOrderingWithSelect = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    enableColumnOrdering
    enableRowSelection
  />
);

export const ColumnOrderingWithPinning = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    enableColumnOrdering
    enablePinning
  />
);

export const ColumnOrderingNoDragHandles = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    enableColumnDragging={false}
    enableColumnOrdering
  />
);

export const ColumnOrderingStateManaged = () => {
  const [columnOrder, setColumnOrder] = useState<TRT_ColumnOrderState>([
    'mrt-row-select',
    ...columns.map((c) => c.accessorKey as string),
  ]);
  return (
    <TailwindCSSReactTable
      columns={columns}
      data={data}
      defaultDisplayColumn={{ enableColumnOrdering: true, enableHiding: true }}
      enableColumnOrdering
      enableRowSelection
      state={{ columnOrder }}
      onColumnOrderChange={setColumnOrder}
    />
  );
};
