import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { data, type Person } from './makeData';

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    //column definitions...
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
    ],
    [], //end
  );

  const table = useMaterialReactTable({
    columns,
    data,
    muiTableHeadCellProps: {
      sx: {
        '& .Mui-TableHeadCell-Content': {
          justifyContent: 'space-between',
        },
      },
    },
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
