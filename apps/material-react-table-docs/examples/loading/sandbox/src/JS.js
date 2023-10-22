import { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';

const data = [];

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
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'city',
        header: 'City',
      },
    ],
    [],
    //end
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      state={{ isLoading: true }}
      muiCircularProgressProps={{
        color: 'secondary',
      }}
      muiSkeletonProps={{
        animation: 'pulse',
        height: 33,
      }}
    />
  );
};

export default Example;
