import { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { data } from './makeData';
import { MenuItem } from '@mui/material';

const Example = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        enableColumnPinning: false, //disable column pinning for this column
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
      {
        accessorKey: 'address',
        header: 'Address',
        size: 300,
      },
      {
        accessorKey: 'city', //this column gets pinned to the right by default because of the initial state,
        header: 'City',
      },
      {
        accessorKey: 'state', //this column gets pinned left by default because of the the initial state,
        header: 'State',
      },
      {
        accessorKey: 'country',
        header: 'Country',
      },
    ],
    [],
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableColumnPinning
      enableRowActions
      renderRowActionMenuItems={() => [
        <MenuItem key="action">Action</MenuItem>,
      ]}
      initialState={{
        columnPinning: { left: ['mrt-row-actions', 'state'], right: ['city'] },
      }}
    />
  );
};

export default Example;
