import { useMemo } from 'react';
import {
  MRT_Table, //import alternative sub-component if we do not want toolbars
  type MRT_ColumnDef,
  useMaterialReactTable,
} from 'material-react-table';
import { data, type Person } from './makeData';

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

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    muiTableBodyRowProps: { hover: false },
    muiTableProps: {
      sx: {
        border: '1px solid rgba(81, 81, 81, .5)',
      },
    },
    muiTableHeadCellProps: {
      sx: {
        border: '1px solid rgba(81, 81, 81, .5)',
      },
    },
    muiTableBodyCellProps: {
      sx: {
        border: '1px solid rgba(81, 81, 81, .5)',
      },
    },
  });

  //using MRT_Table instead of MaterialReactTable if we do not need any of the toolbar components or features
  return <MRT_Table table={table} />;
};

export default Example;
