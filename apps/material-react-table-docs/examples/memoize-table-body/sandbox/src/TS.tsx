import React, { useMemo } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { Typography } from '@mui/material';
import { data, Person } from './makeData';

export const Example = () => {
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
      enableBottomToolbar={false} //no need for bottom toolbar if no pagination
      enableColumnActions={false} //no need for column actions if none of them are enabled
      enableColumnFilters={false} //filtering does not work with memoized table body
      enableDensityToggle={false} //density does not work with memoized table body
      enableGlobalFilter={false} //searching does not work with memoized table body
      enableHiding={false} //column hiding does not work with memoized table body
      enablePagination={false} //pagination does not work with memoized table body
      enableSorting={false} //sorting does not work with memoized table body
      enableStickyHeader
      memoMode="table-body" // memoize table body to improve render performance, but break all features
      muiTableContainerProps={{ sx: { maxHeight: '500px' } }}
      renderTopToolbarCustomActions={() => (
        <Typography component="span" variant="h4">
          Static Memoized Table
        </Typography>
      )}
    />
  );
};

export default Example;
