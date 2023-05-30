import React, { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';

const Example = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        enableColumnFilter: false, // could disable just this column's filter
        header: 'ID',
      },
      //column definitions...
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'middleName',
        header: 'Middle Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
      //end
    ],
    [],
  );

  const data = useMemo(
    //data definitions...
    () => [
      {
        id: 1,
        firstName: 'Hugh',
        middleName: 'Jay',
        lastName: 'Mungus',
      },
      {
        id: 2,
        firstName: 'Leroy',
        middleName: 'Leroy',
        lastName: 'Jenkins',
      },
    ],
    [],
    //end
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableColumnFilters={false} //disable all column filters
    />
  );
};

export default Example;
