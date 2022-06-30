import React, { FC, useEffect, useMemo, useState } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { makeData, Person } from './makeData';

const Example: FC = () => {
  const columns = useMemo(
    //column definitions...
    () =>
      [
        {
          header: 'First Name',
          id: 'firstName',
          size: 150,
        },
        {
          header: 'Middle Name',
          id: 'middleName',
          size: 150,
        },
        {
          header: 'Last Name',
          id: 'lastName',
          size: 150,
        },
        {
          header: 'Email Address',
          id: 'email',
          size: 300,
        },
        {
          header: 'Phone Number',
          id: 'phoneNumber',
        },
        {
          header: 'Address',
          id: 'address',
        },
        {
          header: 'Zip Code',
          id: 'zipCode',
        },
        {
          header: 'City',
          id: 'city',
        },
        {
          header: 'State',
          id: 'state',
        },
        {
          header: 'Country',
          id: 'country',
        },
        {
          header: 'Pet Name',
          id: 'petName',
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
      data={data} //50,000 rows
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
