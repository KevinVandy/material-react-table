import React, { useMemo } from 'react';
import TailwindCSSReactTable from 'tailwindcss-react-table';

const data =
  //data definitions...
  [
    {
      id: 1,
      firstName: 'Dillon',
      lastName: 'Howler',
    },
    {
      id: 2,
      firstName: 'Ross',
      lastName: 'Everest',
    },
  ]; //end

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
        accessorKey: 'lastName',
        header: 'Last Name',
      },
    ],
    [], //end
  );

  return (
    <TailwindCSSReactTable
      columns={columns}
      data={data}
      muiTableHeadCellProps={{
        sx: {
          '& .Mui-TableHeadCell-Content': {
            justifyContent: 'space-between',
          },
        },
      }}
    />
  );
};

export default Example;
