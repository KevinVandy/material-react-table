import { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
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

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      //optionally override the default column widths
      defaultColumn={{
        maxSize: 400,
        minSize: 80,
        size: 150, //default size is usually 180
      }}
      enableColumnResizing
      columnResizeMode="onChange" //default
    />
  );
};

export default Example;
