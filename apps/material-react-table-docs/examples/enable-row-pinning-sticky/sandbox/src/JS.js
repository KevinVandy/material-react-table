import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { data } from './makeData';

const Example = () => {
  const columns = useMemo(
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
