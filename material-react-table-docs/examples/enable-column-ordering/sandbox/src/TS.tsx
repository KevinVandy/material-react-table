import React, { FC, useMemo } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { data, Person } from './makeData';

const Example: FC = () => {
  const columns = useMemo(
    () =>
      [
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
      ] as MRT_ColumnDef<Person>[],
    [],
  );

  return (
    <MaterialReactTable columns={columns} data={data} enableColumnOrdering />
  );
};

export default Example;
