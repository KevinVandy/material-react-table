import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';

export const BasicExample = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
      {
        Header: 'Address',
        accessor: 'address',
      },
      {
        Header: 'State',
        accessor: 'state',
      },
      {
        Header: 'Phone Number',
        accessor: 'phoneNumber',
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
        state: 'Kentucky',
        phoneNumber: '(283) 448-8406 x3430',
      },
      {
        firstName: 'Raquel',
        lastName: 'Kohler',
        address: '769 Dominic Grove',
        state: 'Ohio',
        phoneNumber: '237.441.8991 x5595',
      },
      {
        firstName: 'Ervin',
        lastName: 'Reinger',
        address: '566 Brakus Inlet',
        state: 'West Virginia',
        phoneNumber: '672-649-3434',
      },
      {
        firstName: 'Brittany',
        lastName: 'McCullough',
        address: '722 Emie Stream',
        state: 'Nebraska',
        phoneNumber: '1-832-387-9361 x40362',
      },
      {
        firstName: 'Branson',
        lastName: 'Frami',
        address: '32188 Larkin Turnpike',
        state: 'South Carolina',
        phoneNumber: '268.525.1996',
      },
    ],
    [],
  );
  return <MaterialReactTable columns={columns} data={data} />;
};

export default BasicExample;
