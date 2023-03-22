import React, { useMemo } from 'react';
import MaterialReactTable, { type MRT_ColumnDef } from 'material-react-table';

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
  const columns = useMemo<MRT_ColumnDef<(typeof data)[0]>[]>(
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
    <MaterialReactTable
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
