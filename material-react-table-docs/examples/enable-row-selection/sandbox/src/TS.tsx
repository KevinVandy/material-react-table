import React, { FC, useEffect, useMemo, useState } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { RowSelectionState } from '@tanstack/react-table';

const Example: FC = () => {
  const columns = useMemo(
    () =>
      [
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
      ] as MRT_ColumnDef<typeof data[0]>[],
    [],
  );

  const data = useMemo(
    () => [
      //data definitions...
      {
        firstName: 'Dylan',
        lastName: 'Murray',
        age: 22,
        address: '261 Erdman Ford',
        city: 'East Daphne',
        state: 'Kentucky',
      },
      {
        firstName: 'Raquel',
        lastName: 'Kohler',
        age: 18,
        address: '769 Dominic Grove',
        city: 'Columbus',
        state: 'Ohio',
      },
      //end
    ],
    [],
  );

  //optionally, you can manage the row selection state yourself
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  useEffect(() => {
    //do something when the row selection changes...
    console.info({ rowSelection });
  });

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableRowSelection
      onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
      state={{ rowSelection }}
    />
  );
};

export default Example;
