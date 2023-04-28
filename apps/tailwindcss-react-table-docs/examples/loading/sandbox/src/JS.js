import React, { useMemo } from 'react';
import TailwindCSSReactTable from 'tailwindcss-react-table';

const Example = () => {
  const columns = useMemo(
    //column definitions...
    () => [
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'city',
        header: 'City',
      },
    ],
    [],
    //end
  );

  return (
    <TailwindCSSReactTable
      columns={columns}
      data={[]}
      state={{ isLoading: true }}
    />
  );
};

export default Example;
