import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, {
  type MaterialReactTableProps,
  type MRT_ColumnDef,
} from 'material-react-table';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Loading Examples',
};

export default meta;

const columns: MRT_ColumnDef<(typeof data)[0]>[] = [
  {
    header: 'First Name',
    accessorKey: 'firstName',
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
  },
  {
    header: 'Address',
    accessorKey: 'address',
  },
  {
    header: 'State',
    accessorKey: 'state',
  },
  {
    header: 'Phone Number',
    accessorKey: 'phoneNumber',
  },
];

const data = [...Array(100)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  phoneNumber: faker.phone.number(),
}));

export const Loading: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable columns={columns} data={[]} state={{ isLoading: true }} />
);

export const LoadingWithSelection: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={[]}
    enableRowSelection
    state={{ isLoading: true }}
  />
);

export const LoadingWithDetailPanelExample: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable
    columns={columns}
    data={[]}
    state={{ isLoading: true }}
    renderDetailPanel={({ row }) => (
      <div style={{ display: 'grid' }}>
        <span>City: {row.original.firstName.toString()}</span>
        <span>State: {row.original.state}</span>
        <span>Address: {row.original.address}</span>
        <span>Phone: {row.original.phoneNumber}</span>
      </div>
    )}
  />
);

export const SkeletonDisplayColumns: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={[]}
    enableRowSelection
    enableRowNumbers
    enableExpanding
    enableRowActions
    state={{ showSkeletons: true }}
  />
);

export const ReloadingExample: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    state={{ showProgressBars: true }}
  />
);

export const OnlyTopProgressBar: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    state={{ showProgressBars: true }}
    muiLinearProgressProps={({ isTopToolbar }) => ({
      sx: { display: isTopToolbar ? 'block' : 'none' },
    })}
  />
);
