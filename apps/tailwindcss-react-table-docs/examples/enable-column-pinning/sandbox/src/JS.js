import React, { useMemo } from 'react';
import TailwindCSSReactTable from 'tailwindcss-react-table';
import { data } from './makeData';

const Example = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        enablePinning: false, //disable column pinning for this column
        header: 'ID',
        size: 50,
      },
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
      {
        accessorKey: 'address',
        header: 'Address',
        size: 300,
      },
      {
        accessorKey: 'city', //this column gets pinned to the right by default because of the initial state,
        header: 'City',
      },

      {
        accessorKey: 'state', //this column gets pinned left by default because of the the initial state,
        header: 'State',
      },
    ],
    [],
  );

  return (
    <TailwindCSSReactTable
      columns={columns}
      data={data}
      enablePinning
      initialState={{ columnPinning: { left: ['state'], right: ['city'] } }}
    />
  );
};

export default Example;
