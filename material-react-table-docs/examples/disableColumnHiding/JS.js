import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';

const Example = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'firstName',
        disableColumnHiding: true,
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
        disableColumnHiding: true,
      },
      {
        Header: 'Address',
        accessor: 'address',
      },
      {
        Header: 'City',
        accessor: 'city',
      },
      {
        Header: 'State',
        accessor: 'state',
      },
    ],
    [],
  );

  const data = useMemo(
    () => [
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
    ],
    [],
  );
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      initialState={{ hiddenColumns: ['address'] }}
    />
  );
};

export default Example;
