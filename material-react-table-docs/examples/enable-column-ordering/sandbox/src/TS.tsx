import React, { FC, useMemo } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { data, Person } from './makeData';

const Example: FC = () => {
  const columns = useMemo(
    () =>
      [
        {
          accessorKey: 'firstName',
          header: 'First Name',
        },
        {
          accessorKey: 'lastName',
          header: 'Last Name',
        },
        //column definitions...
        {
          accessorKey: 'address',
          header: 'Address',
        },
        {
          accessorKey: 'city',
          header: 'City',
        },
        //end
        {
          accessorKey: 'state',
          enableColumnOrdering: false, //disable column ordering for this column,
          header: 'State'
        },
      ] as MRT_ColumnDef<Person>[],
    [],
  );

  return (
    <MaterialReactTable columns={columns} data={data} enableColumnOrdering />
  );
};

export default Example;
