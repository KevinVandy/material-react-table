import React, { FC, useMemo } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';

const Example: FC = () => {
  const columns = useMemo(
    () =>
      [
        {
          header: 'First Name',
          accessorKey: 'firstName',
          enableHiding: false,
        },
        {
          header: 'Last Name',
          accessorKey: 'lastName',
          enableHiding: false,
        },
        {
          header: 'Address',
          accessorKey: 'address',
        },
        {
          header: 'City',
          accessorKey: 'city',
        },
        {
          header: 'State',
          accessorKey: 'state',
        },
      ] as MRT_ColumnDef[],
    [],
  );

  const data = useMemo(
    () => [
      //data definitions...
      {
        firstName: 'Dylan',
        lastName: 'Murray',
        address: '261 Erdman Ford',
        city: 'East Daphne',
        state: 'Kentucky',
      },
      {
        firstName: 'Raquel',
        lastName: 'Kohler',
        address: '769 Dominic Grove',
        city: 'Columbus',
        state: 'Ohio',
      },
      {
        firstName: 'Ervin',
        lastName: 'Reinger',
        address: '566 Brakus Inlet',
        city: 'South Linda',
        state: 'West Virginia',
      },
      {
        firstName: 'Brittany',
        lastName: 'McCullough',
        address: '722 Emie Stream',
        city: 'Lincoln',
        state: 'Nebraska',
      },
      {
        firstName: 'Branson',
        lastName: 'Frami',
        address: '32188 Larkin Turnpike',
        city: 'Charleston',
        state: 'South Carolina',
      },
      //end
    ],
    [],
  );
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      initialState={{ columnVisibility: { address: false } }}
    />
  );
};

export default Example;
