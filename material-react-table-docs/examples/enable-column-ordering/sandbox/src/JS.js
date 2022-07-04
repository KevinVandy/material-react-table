import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import { data } from './makeData';

const Example = () => {
  const columns = useMemo(
    () => [
      {
        header: 'First Name',
        accessorKey: 'firstName',
      },
      {
        header: 'Last Name',
        accessorKey: 'lastName',
      },
      //column definitions...
      {
        header: 'Address',
        accessorKey: 'address',
      },
      {
        header: 'City',
        accessorKey: 'city',
      },
      //end
      {
        header: 'State',
        accessorKey: 'state',
        enableColumnOrdering: false, //disable column ordering for this column
      },
    ],
    [],
  );

  return (
    <MaterialReactTable columns={columns} data={data} enableColumnOrdering />
  );
};

export default Example;
