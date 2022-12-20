import React, { useMemo } from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, {
  MaterialReactTableProps,
  MRT_ColumnDef,
} from 'material-react-table';

const meta: Meta = {
  title: 'Fixed Bugs/Loading Data',
};

export default meta;

type Person = {
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  city: string;
  state: string;
};

export const NestedLoadingDataWithInitialExpanded: Story<
  MaterialReactTableProps
> = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      //column definitions...
      {
        accessorKey: 'name.firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'name.lastName',
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
      //end
    ],
    [],
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={[]}
      state={{
        expanded: true,
        isLoading: true,
      }}
    />
  );
};

export const NestedLoadingDataWithInitialFilter: Story<
  MaterialReactTableProps
> = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      //column definitions...
      {
        accessorKey: 'name.firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'name.lastName',
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
      //end
    ],
    [],
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={[]}
      state={{
        columnFilters: [{ id: 'name.firstName', value: 'Branson' }],
        isLoading: true,
      }}
    />
  );
};

export const NestedLoadingDataWithInitialGroup: Story<
  MaterialReactTableProps
> = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      //column definitions...
      {
        accessorKey: 'name.firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'name.lastName',
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
      //end
    ],
    [],
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={[]}
      state={{
        grouping: ['name.firstName'],
        isLoading: true,
      }}
    />
  );
};

export const NestedLoadingDataWithInitialPage: Story<
  MaterialReactTableProps
> = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      //column definitions...
      {
        accessorKey: 'name.firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'name.lastName',
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
      //end
    ],
    [],
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={[]}
      state={{
        pagination: { pageIndex: 2, pageSize: 5 },
        isLoading: true,
      }}
    />
  );
};

export const NestedLoadingDataWithInitialSort: Story<
  MaterialReactTableProps
> = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      //column definitions...
      {
        accessorKey: 'name.firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'name.lastName',
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
      //end
    ],
    [],
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={[]}
      state={{
        sorting: [{ id: 'name.lastName', desc: false }],
        isLoading: true,
      }}
    />
  );
};
