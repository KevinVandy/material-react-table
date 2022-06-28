import React, { FC, useMemo } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { data, Person } from './makeData';

const Example: FC = () => {
  const columns = useMemo(
    () =>
      [
        {
          header: 'ID',
          id: 'id',
          enablePinning: false, //disable pinning ordering for this column
        },
        {
          header: 'First Name',
          id: 'firstName',
        },
        //column definitions...
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
          id: 'state', //this column gets pinned by default because of the the initial state
        },
        //end
      ] as MRT_ColumnDef<Person>[],
    [],
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enablePinning
      initialState={{ columnPinning: { left: ['state'] } }}
    />
  );
};

export default Example;
