import React, { useRef, useState } from 'react';
import { Meta } from '@storybook/react';
import TailwindCSSReactTable, {
  type TRT_ColumnDef,
  type TRT_TableInstance,
} from 'tailwindcss-react-table';
import { faker } from '@faker-js/faker';
import { Button } from '@mui/material';

const meta: Meta = {
  title: 'Features/Selection Examples',
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
    header: 'Age',
    accessorKey: 'age',
  },
  {
    header: 'Address',
    accessorKey: 'address',
  },
];
const data = [...Array(15)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number(80),
  address: faker.address.streetAddress(),
}));

export const SelectionEnabled = () => (
  <TailwindCSSReactTable columns={columns} data={data} enableRowSelection />
);

export const SelectionEnabledConditionally = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    enableRowSelection={(row) => row.original.age >= 21}
  />
);

export const SelectionEnabledWithRowClick = () => (
  <TailwindCSSReactTable
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
    <TailwindCSSReactTable
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
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    enableRowSelection
    selectAllMode="all"
  />
);

export const SelectAllModeAllConditionally = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    enableRowSelection={(row) => row.original.age >= 21}
    selectAllMode="all"
  />
);

export const SelectAllModePage = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    enableRowSelection
    selectAllMode="page"
  />
);

export const SelectAllDisabledCustomHeader = () => (
  <TailwindCSSReactTable
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
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    enableRowSelection
    enableMultiRowSelection={false}
  />
);

export const SingleSelectionRadioWithRowClick = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    enableRowSelection
    enableMultiRowSelection={false}
    muiTableBodyRowProps={({ row }) => ({
      onClick: row.getToggleSelectedHandler(),
      sx: {
        cursor: 'pointer',
      },
    })}
  />
);

export const SelectCheckboxSecondaryColor = () => (
  <TailwindCSSReactTable
    columns={columns}
    data={data}
    enableRowSelection
    muiSelectCheckboxProps={{ color: 'secondary' }}
  />
);

export const SelectionWithInstanceRef = () => {
  const tableInstanceRef = useRef<TRT_TableInstance<(typeof data)[0]>>(null);

  return (
    <TailwindCSSReactTable
      columns={columns}
      data={data}
      enableRowSelection
      tableInstanceRef={tableInstanceRef}
      renderTopToolbarCustomActions={() => (
        <Button
          onClick={() =>
            console.info(tableInstanceRef.current?.getSelectedRowModel().rows)
          }
        >
          Log Selected Rows
        </Button>
      )}
    />
  );
};
