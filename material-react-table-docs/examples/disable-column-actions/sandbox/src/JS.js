import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';

const Example = () => {
  const columns = useMemo(
    () => [
      {
        header: 'ID',
        accessorKey: 'id',
        enableColumnActions: false,
      },
      {
        header: 'First Name',
        accessorKey: 'firstName',
      },
      {
        header: 'Last Name',
        accessorKey: 'lastName',
      },
    ],
    [],
  );

  const data = useMemo(
    () => [
      //data definitions...
      {
        id: 1,
        firstName: 'Dylan',
        lastName: 'Murray',
      },
      {
        id: 2,
        firstName: 'Raquel',
        lastName: 'Kohler',
      },
      //end
    ],
    [],
  );

  return <MaterialReactTable columns={columns} data={data} />;
};

export default Example;
