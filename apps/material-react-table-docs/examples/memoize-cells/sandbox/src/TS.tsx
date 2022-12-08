import React, { FC, useMemo } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { Typography } from '@mui/material';
import { data, Person } from './makeData';

export const Example: FC = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
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

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      //just for demo purposes
      defaultColumn={{
        Cell: ({ cell }) => {
          //see how often cells are re-rendered
          // console.info('render cell', cell.id);
          return <>{cell.getValue()}</>;
        },
      }}
      editingMode="row"
      enableColumnOrdering
      enableDensityToggle={false} //density toggle is not compatible with memoization
      enableEditing
      enablePinning
      enableRowSelection
      enableStickyHeader
      initialState={{ pagination: { pageSize: 20, pageIndex: 0 } }}
      memoMode="cells"
      muiTableContainerProps={{ sx: { maxHeight: '500px' } }}
      renderDetailPanel={({ row }) => <div>{row.original.firstName}</div>}
      renderTopToolbarCustomActions={() => (
        <Typography component="span" variant="h4">
          Memoized Cells
        </Typography>
      )}
    />
  );
};

export default Example;
