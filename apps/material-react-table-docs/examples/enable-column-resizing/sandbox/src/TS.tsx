import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { data, type Person } from './makeData';

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'firstName',
        header: 'First Name', //uses the default width from defaultColumn prop
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'email',
        header: 'Email Address',
        size: 250, //increase the width of this column
      },
      {
        accessorKey: 'city',
        header: 'City',
        size: 200, //decrease the width of this column
        enableResizing: false, //disable resizing for this column
      },
      {
        accessorKey: 'country',
        header: 'Country',
        size: 140, //decrease the width of this column
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data,
    //optionally override the default column widths
    defaultColumn: {
      maxSize: 400,
      minSize: 80,
      size: 160, //default size is usually 180
    },
    enableColumnResizing: true,
    columnResizeMode: 'onChange', //default
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
