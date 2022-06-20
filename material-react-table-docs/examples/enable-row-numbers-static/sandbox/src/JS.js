import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import { data } from './makeData';

const Example = () => {
  const columns = useMemo(
    () => [
      //column definitions...
      {
        header: 'First Name',
        id: 'firstName',
      },
      {
        header: 'Last Name',
        id: 'lastName',
      },
      {
        header: 'Address',
        id: 'address',
      },
      {
        header: 'City',
        id: 'city',
      },
      {
        header: 'State',
        id: 'state',
      },
      //end
    ],
    [],
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableRowNumbers
      rowNumberMode="static"
    />
  );
};

export default Example;
