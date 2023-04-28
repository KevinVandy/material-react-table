import React, { useMemo } from 'react';
import MaterialReactTable, { type TRT_ColumnDef } from 'material-react-table';
import type { Person } from './makeData';

const Example = () => {
  const columns = useMemo<TRT_ColumnDef<Person>[]>(
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
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'city',
        header: 'City',
      },
    ],
    [],
    //end
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={[]}
      state={{ isLoading: true }}
    />
  );
};

export default Example;
