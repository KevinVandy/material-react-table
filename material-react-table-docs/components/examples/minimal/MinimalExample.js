import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import { getMockData } from '../getMockData';

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

  const data = useMemo(() => getMockData(), []);

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      disableColumnActions
      disableSortBy
      hideToolbarBottom
      hideToolbarTop
      manualPagination
    />
  );
};

export default BasicExample;
