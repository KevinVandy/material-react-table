import React, { useEffect, useMemo, useState } from 'react';
import MaterialReactTable from 'material-react-table';

const data = [
  {
    userId: '3f25309c-8fa1-470f-811e-cdb082ab9017', //we'll use this as a unique row id
    firstName: 'Dylan',
    lastName: 'Murray',
    age: 22,
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  }, //data definitions...
  {
    userId: 'be731030-df83-419c-b3d6-9ef04e7f4a9f',
    firstName: 'Raquel',
    lastName: 'Kohler',
    age: 18,
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
  },
  //end
];

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
    ],
    [], //end
  );

  //optionally, you can manage the row selection state yourself
  const [rowSelection, setRowSelection] = useState < RowSelectionState > {};

  useEffect(() => {
    //do something when the row selection changes...
    console.info({ rowSelection });
  });

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableRowSelection
      getRowId={(row) => row.userId} //give each row a more useful id
      onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
      state={{ rowSelection }} //pass our managed row selection state to the table to use
    />
  );
};

export default Example;
