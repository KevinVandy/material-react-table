import React, { useMemo } from 'react';
import TailwindCSSReactTable from 'tailwindcss-react-table';
import { data } from './makeData';

const Example = () => {
  const columns = useMemo(
    () => [
      //column definitions...
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'age',
        header: 'Age',
      },
      {
        accessorKey: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'city',
        header: 'City',
      },
      {
        accessorKey: 'state',
        header: 'State',
      },
      //end
    ],
    [],
  );

  return (
    <TailwindCSSReactTable
      columns={columns}
      data={data}
      enableSelectAll={false}
      enableRowSelection={(row) => row.original.age >= 21} //enable row selection conditionally per row
      muiSelectCheckboxProps={{ color: 'secondary' }}
    />
  );
};

export default Example;
