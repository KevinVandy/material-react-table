import React, { useEffect, useMemo, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import { makeData } from './makeData';

const data = makeData(50_000);

const Example = () => {
  const columns = useMemo(
    //column definitions...
    () => [
      {
        header: 'First Name',
        accessorKey: 'firstName',
        size: 150,
      },
      {
        header: 'Middle Name',
        accessorKey: 'middleName',
        size: 150,
      },
      {
        header: 'Last Name',
        accessorKey: 'lastName',
        size: 150,
      },
      {
        header: 'Email Address',
        accessorKey: 'email',
        size: 300,
      },
      {
        header: 'Phone Number',
        accessorKey: 'phoneNumber',
      },
      {
        header: 'Address',
        accessorKey: 'address',
      },
      {
        header: 'Zip Code',
        accessorKey: 'zipCode',
      },
      {
        header: 'City',
        accessorKey: 'city',
      },
      {
        header: 'State',
        accessorKey: 'state',
      },
      {
        header: 'Country',
        accessorKey: 'country',
      },
      {
        header: 'Pet Name',
        accessorKey: 'petName',
      },
    ],
    [],
    //end
  );

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setData(makeData(20_000));
    setIsLoading(false);
  }, []);

  return (
    <MaterialReactTable
      columns={columns}
      data={data} //20,000 rows
      enablePagination={false}
      enableRowNumbers
      enableRowVirtualization
      enableToolbarBottom={false}
      initialState={{ density: 'compact' }}
      muiTableContainerProps={{ sx: { maxHeight: '600px' } }}
      state={{ isLoading }}
      virtualizerProps={{ overscan: 50 }}
    />
  );
};

export default Example;
