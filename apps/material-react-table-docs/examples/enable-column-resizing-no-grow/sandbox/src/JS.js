import { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { data } from './makeData';

const Example = () => {
  const columns = useMemo(
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
        header: 'Email Address',
        size: 300,
      },
    ],
    [],
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableColumnResizing
      layoutMode="grid"
      //Disables the default flex-grow behavior of the table cells
      muiTableHeadCellProps={{
        sx: {
          flex: '0 0 auto',
        },
      }}
      muiTableBodyCellProps={{
        sx: {
          flex: '0 0 auto',
        },
      }}
      //
    />
  );
};

export default Example;
