import React, { FC, useMemo } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { makeData, Person } from './makeData';
import { NoSsr } from '@mui/material';

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

  return (
    <NoSsr>
      <MaterialReactTable
        columns={columns}
        data={makeData(50_000)}
        enablePagination={false}
        enableRowNumbers
        enableRowVirtualization
        enableToolbarBottom={false}
        initialState={{ density: 'compact' }}
        virtualizerProps={{ overscan: 50 }}
      />
    </NoSsr>
  );
};

export default Example;
