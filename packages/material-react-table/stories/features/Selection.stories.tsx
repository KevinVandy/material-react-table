import { useState } from 'react';
import Remove from '@mui/icons-material/Remove';
import Send from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {
  type MRT_ColumnDef,
  MRT_SelectCheckbox,
  MaterialReactTable,
} from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Features/Selection Examples',
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
    accessorKey: 'age',
    header: 'Age',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
];
const data = [...Array(15)].map(() => ({
  address: faker.location.streetAddress(),
  age: faker.number.int(80),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
}));

export const SelectionEnabled = () => (
  <MaterialReactTable columns={columns} data={data} enableRowSelection />
);

export const SelectionEnabledConditionally = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowSelection={(row) => row.original.age >= 21}
  />
);

export const SelectionEnabledWithRowClick = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowSelection
    muiTableBodyRowProps={({ row }) => ({
      onClick: row.getToggleSelectedHandler(),
      sx: {
        cursor: 'pointer',
      },
    })}
  />
);

export const ManualSelection = () => {
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  console.info(rowSelection);

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      muiTableBodyRowProps={({ row }) => ({
        onClick: () =>
          setRowSelection((prev) => ({
            ...prev,
            [row.id]: !prev[row.id],
          })),
        selected: rowSelection[row.id],
        sx: {
          cursor: 'pointer',
        },
      })}
      state={{ rowSelection }}
    />
  );
};

export const SelectAllModeAll = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowSelection
    selectAllMode="all"
  />
);

export const SelectAllModeAllConditionally = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowSelection={(row) => row.original.age >= 21}
    selectAllMode="all"
  />
);

export const SelectAllModePage = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowSelection
    selectAllMode="page"
  />
);

export const SelectAllDisabledCustomHeader = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    displayColumnDefOptions={{
      'mrt-row-select': { header: 'Your Custom Header' },
    }}
    enableRowSelection
    enableSelectAll={false}
  />
);

export const SingleSelectionRadio = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableMultiRowSelection={false}
    enableRowSelection
  />
);

export const SingleSelectionRadioWithRowClick = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableMultiRowSelection={false}
    enableRowSelection
    muiTableBodyRowProps={({ row }) => ({
      onClick: row.getToggleSelectedHandler(),
      sx: {
        cursor: 'pointer',
      },
    })}
  />
);

export const SelectCheckboxSecondaryColor = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowSelection
    muiSelectCheckboxProps={{ color: 'secondary' }}
  />
);

export const AlertBannerBottom = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowSelection
    positionToolbarAlertBanner="bottom"
  />
);

export const AlertBannerHeadOverlay = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowSelection
    positionToolbarAlertBanner="head-overlay"
  />
);

export const CustomAlertBannerHeadOverlay = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableRowSelection
    muiToolbarAlertBannerProps={{
      color: 'info',
    }}
    positionToolbarAlertBanner="head-overlay"
    renderToolbarAlertBannerContent={({ selectedAlert, table }) => (
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
      >
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            gap: '6px',
            p: '4px 12px',
            width: '100%',
          }}
        >
          <MRT_SelectCheckbox selectAll table={table} /> {selectedAlert}{' '}
        </Box>
        <Box sx={{ display: 'flex', gap: '6px' }}>
          <Button color="success" startIcon={<Send />} variant="contained">
            Email
          </Button>
          <Button color="error" startIcon={<Remove />} variant="contained">
            Remove
          </Button>
        </Box>
      </Box>
    )}
  />
);
