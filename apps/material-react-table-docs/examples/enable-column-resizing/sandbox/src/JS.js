import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { data } from './makeData';

const Example = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'firstName',
        header: 'First Name', //uses the default width from defaultColumn prop
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
        enableResizing: false, //disable resizing for this column
      },
      {
        accessorKey: 'email',
        header: 'Email Address',
        size: 200, //increase the width of this column
      },
      {
        accessorKey: 'city',
        header: 'City',
        size: 120, //decrease the width of this column
      },
      {
        accessorKey: 'country',
        header: 'Country',
        size: 100, //decrease the width of this column
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
