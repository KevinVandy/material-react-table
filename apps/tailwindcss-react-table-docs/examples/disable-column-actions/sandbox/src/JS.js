import React, { useMemo } from 'react';
import TailwindCSSReactTable from 'tailwindcss-react-table';

const Example = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        enableColumnActions: false,
        header: 'ID',
      },
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
    ],
    [],
  );

  const data = useMemo(
    //data definitions...
    () => [
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
    ],
    [],
    //end
  );

  return <TailwindCSSReactTable columns={columns} data={data} />;
};

export default Example;
