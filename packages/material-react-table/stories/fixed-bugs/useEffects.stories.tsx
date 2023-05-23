import { useEffect, useMemo, useState } from 'react';
import { Meta } from '@storybook/react';
import MaterialReactTable, {
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
} from '../../src';
import { faker } from '@faker-js/faker';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

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

export const FilterModesRefetch = () => {
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

export const FilterOptionsAsync = () => {
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

export const EditOptionsAsync = () => {
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

export const RenderRowActionsAsync = () => {
  const [rowActions, setRowActions] = useState<string[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setRowActions(['Edit', 'Delete']);
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
      },
      {
        header: 'Phone Number',
        accessorKey: 'phoneNumber',
      },
    ],
    [],
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableRowActions
      renderRowActions={() => (
        <Box sx={{ display: 'flex', gap: '1rem', whiteSpace: 'nowrap' }}>
          {rowActions.map((action) => (
            <Button key={action} type="button">
              {action}
            </Button>
          ))}
        </Box>
      )}
    />
  );
};

export const renderRowActionMenuItemsAsync = () => {
  const [rowActions, setRowActions] = useState<string[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setRowActions(['Edit', 'Delete']);
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
      },
      {
        header: 'Phone Number',
        accessorKey: 'phoneNumber',
      },
    ],
    [],
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableRowActions
      renderRowActionMenuItems={() =>
        rowActions.map((action) => [<MenuItem key={action}>{action}</MenuItem>])
      }
    />
  );
};
