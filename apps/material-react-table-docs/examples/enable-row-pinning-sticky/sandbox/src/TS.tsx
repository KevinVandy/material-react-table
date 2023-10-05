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
    enableRowPinning: true,
    enablePagination: false,
    enableStickyHeader: true,
    getRowId: (row) => row.email,
    initialState: {
      rowPinning: {
        top: ['rkholer33@yopmail.com', 'egarcia@yopmail.com'],
        bottom: [],
      },
    },
    muiTableContainerProps: {
      sx: {
        maxHeight: '400px',
      },
    },
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
