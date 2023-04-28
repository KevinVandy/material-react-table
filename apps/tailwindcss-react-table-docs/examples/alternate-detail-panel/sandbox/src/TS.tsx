import React, { useMemo } from 'react';
import TailwindCSSReactTable, {
  type TRT_ColumnDef,
} from 'tailwindcss-react-table';
import { Box, Typography } from '@mui/material';
import { data, type Person } from './makeData';

const Example = () => {
  const columns = useMemo<TRT_ColumnDef<Person>[]>(
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
  );

  return (
    <TailwindCSSReactTable
      columns={columns}
      data={data}
      displayColumnDefOptions={{
        'mrt-row-expand': {
          muiTableHeadCellProps: {
            align: 'right',
          },
          muiTableBodyCellProps: {
            align: 'right',
          },
        },
      }}
      initialState={{ expanded: true }}
      renderDetailPanel={({ row }) => (
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
      )}
      positionExpandColumn="last"
    />
  );
};

export default Example;
