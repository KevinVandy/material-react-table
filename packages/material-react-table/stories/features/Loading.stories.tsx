import { type MRT_ColumnDef, MaterialReactTable } from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Features/Loading Examples',
};

export default meta;

interface Person {
  address: null | string;
  firstName: null | string;
  lastName: null | string;
  phoneNumber: null | string;
  state: null | string;
}

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
    accessorKey: 'state',
    header: 'State',
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone Number',
  },
];

const data = [...Array(100)].map(() => ({
  address: faker.location.streetAddress(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  phoneNumber: faker.phone.number(),
  state: faker.location.state(),
}));

const blankData = [...Array(100)].map(() => ({
  address: null,
  firstName: null,
  lastName: null,
  phoneNumber: null,
  state: null,
}));

export const Loading = () => (
  <MaterialReactTable columns={columns} data={[]} state={{ isLoading: true }} />
);

export const Loading5 = () => (
  <MaterialReactTable
    columns={columns}
    data={[]}
    state={{ isLoading: true, pagination: { pageIndex: 0, pageSize: 5 } }}
  />
);

export const LoadingWithProgressBars = () => (
  <MaterialReactTable
    columns={columns}
    data={[]}
    state={{ isLoading: true, showProgressBars: true }}
  />
);

export const LoadingWithProgressBarsNoOverlay = () => (
  <MaterialReactTable
    columns={columns}
    data={[]}
    state={{
      isLoading: true,
      showLoadingOverlay: false,
      showProgressBars: true,
    }}
  />
);

export const LoadingWithSomeData = () => (
  <MaterialReactTable
    columns={columns}
    data={[...data.slice(0, 5), ...blankData]}
    state={{ isLoading: true }}
  />
);

export const LoadingWithSelection = () => (
  <MaterialReactTable
    columns={columns}
    data={[]}
    enableRowSelection
    state={{ isLoading: true }}
  />
);

export const LoadingWithDetailPanelExample = () => (
  <MaterialReactTable
    columns={columns}
    data={[]}
    renderDetailPanel={({ row }) => (
      <div style={{ display: 'grid' }}>
        <span>City: {row.original.firstName?.toString()}</span>
        <span>State: {row.original.state}</span>
        <span>Address: {row.original.address}</span>
        <span>Phone: {row.original.phoneNumber}</span>
      </div>
    )}
    state={{ isLoading: true }}
  />
);

export const SkeletonDisplayColumns = () => (
  <MaterialReactTable
    columns={columns}
    data={[]}
    enableExpanding
    enableRowActions
    enableRowNumbers
    enableRowSelection
    state={{ showSkeletons: true }}
  />
);

export const ReloadingExample = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    state={{ showProgressBars: true }}
  />
);

export const OnlyTopProgressBar = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    muiLinearProgressProps={({ isTopToolbar }) => ({
      sx: { display: isTopToolbar ? 'block' : 'none' },
    })}
    state={{ showProgressBars: true }}
  />
);
