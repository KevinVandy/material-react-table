import React, { FC, useEffect, useMemo, useState } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { makeData, Person } from './makeData';

const Example: FC = () => {
  const columns = useMemo(
    //column definitions...
    () =>
      [
        {
          accessorKey: 'firstName',
          header: 'First Name',
          size: 150,
        },
        {
          accessorKey: 'middleName',
          header: 'Middle Name',
          size: 150,
        },
        {
          accessorKey: 'lastName',
          header: 'Last Name',
          size: 150,
        },
        {
          accessorKey: 'email',
          header: 'Email Address',
          size: 300,
        },
        {
          accessorKey: 'phoneNumber',
          header: 'Phone Number',
        },
        {
          accessorKey: 'address',
          header: 'Address',
        },
        {
          accessorKey: 'zipCode',
          header: 'Zip Code',
        },
        {
          accessorKey: 'city',
          header: 'City',
        },
        {
          accessorKey: 'state',
          header: 'State',
        },
        {
          accessorKey: 'country',
          header: 'Country',
        },
        {
          accessorKey: 'petName',
          header: 'Pet Name',
        },
      ] as MRT_ColumnDef<Person>[],
    [],
    //end
  );

  const [data, setData] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setData(makeData(20_000));
      setIsLoading(false);
    }
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
