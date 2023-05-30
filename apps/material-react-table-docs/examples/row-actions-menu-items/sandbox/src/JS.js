import React, { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { data } from './makeData';
import { MenuItem } from '@mui/material';

export const Example = () => {
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

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableRowActions
      renderRowActionMenuItems={({ row }) => [
        <MenuItem key="edit" onClick={() => console.info('Edit')}>
          Edit
        </MenuItem>,
        <MenuItem key="delete" onClick={() => console.info('Delete')}>
          Delete
        </MenuItem>,
      ]}
    />
  );
};

export default Example;
