import { useState } from 'react';
import {
  type MRT_ColumnDef,
  type MRT_ColumnOrderState,
  MaterialReactTable,
} from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Features/Column Ordering Examples',
};

export default meta;

const columns: MRT_ColumnDef<(typeof data)[0]>[] = [
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
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

const data = [...Array(100)].map(() => ({
  address: faker.location.streetAddress(),
  city: faker.location.city(),
  email: faker.internet.email(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  state: faker.location.state(),
}));

export const ColumnOrderingEnabled = () => (
  <MaterialReactTable columns={columns} data={data} enableColumnOrdering />
);

export const DisplayColumnOrderingEnabled = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    defaultDisplayColumn={{ enableColumnOrdering: true }}
    enableColumnOrdering
    enableRowActions
    enableRowDragging
    enableRowNumbers
    enableRowSelection
    positionActionsColumn="last"
  />
);

export const ColumnOrderingDisabledPerColumn = () => (
  <MaterialReactTable
    columns={[
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
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
        enableColumnOrdering: false,
        header: 'State',
      },
    ]}
    data={data}
    enableColumnOrdering
  />
);

export const ColumnOrderingWithSelect = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableColumnOrdering
    enableRowSelection
  />
);

export const ColumnOrderingWithPinning = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableColumnOrdering
    enableColumnPinning
  />
);

export const ColumnOrderingNoDragHandles = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableColumnDragging={false}
    enableColumnOrdering
  />
);

export const ColumnOrderingStateManaged = () => {
  const [columnOrder, setColumnOrder] = useState<MRT_ColumnOrderState>(() =>
    columns.map((c) => c.accessorKey as string),
  );
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      defaultDisplayColumn={{ enableColumnOrdering: true, enableHiding: true }}
      enableColumnOrdering
      enableRowSelection
      onColumnOrderChange={setColumnOrder}
      state={{ columnOrder }}
    />
  );
};

export const ColumnOrderingStateManagedCustom = () => {
  const [columnOrder, setColumnOrder] = useState<MRT_ColumnOrderState>(() => [
    ...columns.map((c) => c.accessorKey as string),
    'mrt-row-select',
  ]);
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      defaultDisplayColumn={{ enableColumnOrdering: true, enableHiding: true }}
      enableColumnOrdering
      enableRowSelection
      onColumnOrderChange={setColumnOrder}
      state={{ columnOrder }}
    />
  );
};

export const ColumnOrderingEnabledWithColumnVirtualization = () => (
  <MaterialReactTable
    columnVirtualizerOptions={{
      overscan: 0,
    }}
    columns={columns}
    data={data}
    enableColumnOrdering
    enableColumnVirtualization
  />
);
