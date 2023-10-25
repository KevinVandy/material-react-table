import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { data } from './makeData';

const Example = () => {
  const columns = useMemo(
    //column definitions...
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
    //end
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
    initialState: {
      rowPinning: {
        top: ['ereinger@mailinator.com'],
      },
      rowSelection: {
        'ereinger@mailinator.com': true,
      },
    },
    muiTableContainerProps: {
      sx: {
        maxHeight: '400px',
      },
    },
    muiTableBodyRowProps: ({ row, table }) => {
      const { density } = table.getState();
      return {
        sx: {
          //Set a fixed height for pinned rows
          height: row.getIsPinned()
            ? `${
                //Default mrt row height estimates. Adjust as needed.
                density === 'compact' ? 37 : density === 'comfortable' ? 53 : 69
              }px`
            : undefined,
        },
      };
    },
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
