import React, { useMemo } from 'react';
import MaterialReactTable, { type MRT_ColumnDef } from 'material-react-table';
import { Box, Typography } from '@mui/material';
import { data, type Person } from './makeData';

const Example = () => {
  const columns = useMemo(
    () =>
      [
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
      ] as MRT_ColumnDef<Person>[],
    [],
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
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
    />
  );
};

export default Example;
