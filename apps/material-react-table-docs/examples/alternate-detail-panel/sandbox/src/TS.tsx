import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { data, type Person } from './makeData';

const Example = () => {
  const isMobile = useMediaQuery('(max-width: 720px)');

  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    //column definitions...
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'middleName',
        header: 'Middle Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
    ],
    [],
    //end
  );

  const table = useMaterialReactTable({
    columns,
    data,
    // displayColumnDefOptions: { //built-in now in v2.6.0 when positionExpandColumn is 'last'
    //   'mrt-row-expand': {
    //     muiTableHeadCellProps: {
    //       align: 'right',
    //     },
    //     muiTableBodyCellProps: {
    //       align: 'right',
    //     },
    //   },
    // },
    enableColumnPinning: isMobile, //alternative
    initialState: {
      expanded: true,
    },
    state: {
      columnPinning: isMobile ? { right: ['mrt-row-expand'] } : {}, //alternative
    },
    renderDetailPanel: ({ row }) => (
      <Box
        sx={{
          display: 'grid',
          margin: 'auto',
          gridTemplateColumns: '1fr 1fr',
          width: '100%',
        }}
      >
        <Typography>Address: {row.original.address}</Typography>
        <Typography>City: {row.original.city}</Typography>
        <Typography>State: {row.original.state}</Typography>
        <Typography>Country: {row.original.country}</Typography>
      </Box>
    ),
    positionExpandColumn: 'last',
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
