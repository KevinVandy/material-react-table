import React, { FC, useMemo } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { data, Person } from './makeData';

const Example: FC = () => {
  const columns = useMemo(
    //column definitions...
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
        {
          header: 'Address',
          accessorKey: 'address',
        },
        {
          header: 'City',
          accessorKey: 'city',
        },
        {
          header: 'State',
          accessorKey: 'state',
        },
      ] as MRT_ColumnDef<Person>[],
    [],
    //end
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableDensityToggle={false}
      initialState={{ density: 'compact' }}
    />
  );
};

export default Example;
