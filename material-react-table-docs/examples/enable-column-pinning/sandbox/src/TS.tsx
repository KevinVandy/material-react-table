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
          enablePinning: false, //disable column pinning for this column
          size: 50,
        },
        {
          header: 'First Name',
          id: 'firstName',
        },
        {
          header: 'Middle Name',
          id: 'middleName',
        },
        {
          header: 'Last Name',
          id: 'lastName',
        },
        {
          header: 'Address',
          id: 'address',
          size: 300,
        },
        {
          header: 'City',
          id: 'city', //this column gets pinned to the right by default because of the initial state
        },

        {
          header: 'State',
          id: 'state', //this column gets pinned left by default because of the the initial state
        },
      ] as MRT_ColumnDef<Person>[],
    [],
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enablePinning
      initialState={{ columnPinning: { left: ['state'], right: ['city'] } }}
    />
  );
};

export default Example;
