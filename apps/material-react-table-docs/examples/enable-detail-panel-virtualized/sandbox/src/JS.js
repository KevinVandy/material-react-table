import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { Box, Typography } from '@mui/material';
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
    ],
    [],
    //end
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableBottomToolbar: false,
    enablePagination: false,
    enableRowVirtualization: true,
    muiTableContainerProps: {
      sx: {
        maxHeight: '500px',
      },
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
    rowVirtualizerOptions: ({ table }) => {
      const { density, expanded } = table.getState();
      return {
        //adjust to your needs
        estimateSize: (index) =>
          index % 2 === 1 //even rows are normal rows, odd rows are detail panels
            ? //Estimate open detail panels as 80px tall, closed detail panels as 0px tall
              expanded === true
              ? 80
              : 0
            : //estimate normal row heights
              density === 'compact'
              ? 37
              : density === 'comfortable'
                ? 58
                : 73,
      };
    },
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
