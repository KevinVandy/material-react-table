import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import { data } from './makeData';

const Example = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'firstName',
        header: 'First Name',
        footer: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
        footer: 'Last Name',
      },
      {
        accessorKey: 'email',
        header: 'Email',
        footer: 'Email',
      },
      {
        accessorKey: 'city',
        header: 'City',
        footer: 'City',
      },
    ],
    [],
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableStickyHeader
      enableStickyFooter
      muiTableContainerProps={{ sx: { maxHeight: '300px' } }}
    />
  );
};

export default Example;
