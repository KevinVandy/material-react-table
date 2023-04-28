import React, { useMemo } from 'react';
import TailwindCSSReactTable from 'tailwindcss-react-table';
import { data } from './makeData';

const Example = () => {
  const columns = useMemo(
    //column definitions...
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
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
        accessorKey: 'age',
        header: 'Age',
      },
    ],
    [],
    //end
  );

  return (
    <TailwindCSSReactTable
      columns={columns}
      data={data}
      enableGlobalFilterModes
      initialState={{
        showGlobalFilter: true,
      }}
      positionGlobalFilter="left"
      muiSearchTextFieldProps={{
        placeholder: `Search ${data.length} rows`,
        sx: { minWidth: '300px' },
        variant: 'outlined',
      }}
    />
  );
};

export default Example;
