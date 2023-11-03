import { useMemo } from 'react';
import { Box, Button } from '@mui/material';
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
    ],
    [],
    //end
  );

  const table = useMaterialReactTable({
    columns,
    data,
    defaultDisplayColumn: {
      enableResizing: true, //turn on some features that are usually off for all display columns
    },
    displayColumnDefOptions: {
      'mrt-row-actions': {
        size: 350, //set custom width
        muiTableHeadCellProps: {
          align: 'center', //change head cell props
        },
      },
      'mrt-row-numbers': {
        enableColumnDragging: true,
        enableColumnOrdering: true, //turn on some features that are usually off
        enableResizing: true,
        muiTableHeadCellProps: {
          sx: {
            fontSize: '1.2rem',
          },
        },
      },
      'mrt-row-select': {
        enableColumnActions: true,
        enableHiding: true,
        size: 100,
      },
    },
    enableColumnResizing: true,
    enableColumnOrdering: true,
    enableRowNumbers: true,
    enableRowSelection: true,
    enableRowActions: true,
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
