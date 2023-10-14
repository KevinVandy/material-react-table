import { useMemo } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { data } from './makeData';

const Example = () => {
  const columns = useMemo(
    () =>
      [
        //column definitions...
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
        //end
      ] as MRT_ColumnDef<(typeof data)[0]>[],
    [],
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableSelectAll={false}
      enableRowSelection={(row) => row.original.age >= 21} //enable row selection conditionally per row
      muiSelectCheckboxProps={{ color: 'secondary' }}
    />
  );
};

export default Example;
