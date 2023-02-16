import React, { useEffect, useMemo, useState } from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, {
  MaterialReactTableProps,
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
} from 'material-react-table';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Fixed Bugs/useEffects',
};

export default meta;

const data = [...Array(100)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  phoneNumber: faker.phone.number(),
}));

export const FilterModesRefetch: Story<MaterialReactTableProps> = () => {
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    [],
  );

  useEffect(() => {
    console.log('refetch', columnFilters);
  }, [columnFilters]);

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

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableColumnFilterModes
      initialState={{ showColumnFilters: true }}
      state={{ columnFilters }}
      onColumnFiltersChange={setColumnFilters}
    />
  );
};

export const FilterOptionsAsync: Story<MaterialReactTableProps> = () => {
  const [stateFilterOptions, setStateFilterOptions] = useState<string[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setStateFilterOptions(['CA', 'NY', 'TX']);
    }, 2000);
  }, []);

  const columns = useMemo<MRT_ColumnDef<(typeof data)[0]>[]>(
    () => [
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
        filterVariant: 'select',
        filterSelectOptions: stateFilterOptions,
      },
      {
        header: 'Phone Number',
        accessorKey: 'phoneNumber',
      },
    ],
    [stateFilterOptions],
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableColumnFilterModes
      initialState={{ showColumnFilters: true }}
    />
  );
};

export const EditOptionsAsync: Story<MaterialReactTableProps> = () => {
  const [stateEditOptions, setStateEditOptions] = useState<string[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setStateEditOptions(['CA', 'NY', 'TX']);
    }, 2000);
  }, []);

  const columns = useMemo<MRT_ColumnDef<(typeof data)[0]>[]>(
    () => [
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
        editVariant: 'select',
        editSelectOptions: stateEditOptions,
      },
      {
        header: 'Phone Number',
        accessorKey: 'phoneNumber',
      },
    ],
    [stateEditOptions],
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableEditing
      editingMode="row"
    />
  );
};
