import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { data, type Person } from './makeData';

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
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
        header: 'Email',
      },
      {
        accessorKey: 'city',
        header: 'City',
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enablePagination: false,
    enableRowPinning: true,
    enableRowSelection: true,
    enableStickyHeader: true,
    rowPinningDisplayMode: 'select-sticky',
    getRowId: (row) => row.email,
    muiTableContainerProps: {
      sx: {
        maxHeight: '400px',
      },
    },
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
