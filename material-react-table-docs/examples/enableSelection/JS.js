import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';

const Example = () => {
  const columns = useMemo(
    () => [
      //column definitions...
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
      {
        Header: 'Age',
        accessor: 'age',
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
      //end
    ],
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
  return <MaterialReactTable columns={columns} data={data} enableSelection />;
};

export default Example;
