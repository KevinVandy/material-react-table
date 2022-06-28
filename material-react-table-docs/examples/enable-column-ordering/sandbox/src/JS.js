import React, { useMemo } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { data, Person } from './makeData';

const Example = () => {
  const columns = useMemo(
    () => [
      {
        header: 'First Name',
        id: 'firstName',
      },
      {
        header: 'Last Name',
        id: 'lastName',
      },
      //column definitions...
      {
        header: 'Address',
        id: 'address',
      },
      {
        header: 'City',
        id: 'city',
      },
      //end
      {
        header: 'State',
        id: 'state',
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
