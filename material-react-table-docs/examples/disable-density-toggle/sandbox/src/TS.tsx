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
