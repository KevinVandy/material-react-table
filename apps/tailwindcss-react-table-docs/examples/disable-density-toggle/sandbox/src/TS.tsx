import React, { useMemo } from 'react';
import TailwindCSSReactTable, {
  type TRT_ColumnDef,
} from 'tailwindcss-react-table';
import { data, type Person } from './makeData';

const Example = () => {
  const columns = useMemo(
    //column definitions...
    () =>
      [
        {
          accessorKey: 'firstName',
          header: 'First Name',
        },
        {
          accessorKey: 'lastName',
          header: 'Last Name',
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
      ] as TRT_ColumnDef<Person>[],
    [],
    //end
  );

  return (
    <TailwindCSSReactTable
      columns={columns}
      data={data}
      enableDensityToggle={false}
      initialState={{ density: 'compact' }}
    />
  );
};

export default Example;
