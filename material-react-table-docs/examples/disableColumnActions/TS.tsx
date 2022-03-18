import React, { FC, useMemo } from 'react';
import MaterialReactTable from 'material-react-table';

const Example: FC = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id' as const,
        disableColumnActions: true,
      },
      {
        Header: 'First Name',
        accessor: 'firstName' as const,
      },
      {
        Header: 'Last Name',
        accessor: 'lastName' as const,
      },
    ],
    [],
  );

  const data = useMemo(
    () => [
      //data definitions...
      {
        id: 1,
        firstName: 'Dylan',
        lastName: 'Murray',
      },
      {
        id: 2,
        firstName: 'Raquel',
        lastName: 'Kohler',
      },
      //end
    ],
    [],
  );
  return <MaterialReactTable columns={columns} data={data} />;
};

export default Example;
