import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { data, type Person } from './makeData';
import { MenuItem } from '@mui/material';

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'id',
        enableColumnPinning: false, //disable column pinning for this column
        header: 'ID',
        size: 50,
      },
      //column definitions...
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
      //end
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

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnPinning: true,
    enableRowActions: true,
    layoutMode: 'grid-no-grow', //constant column widths
    renderRowActionMenuItems: () => [<MenuItem key="action">Action</MenuItem>],
    initialState: {
      columnPinning: { left: ['mrt-row-actions', 'state'], right: ['city'] },
    },
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
