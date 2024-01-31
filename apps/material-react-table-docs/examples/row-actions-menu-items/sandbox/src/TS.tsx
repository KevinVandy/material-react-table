import { useMemo } from 'react';
import {
  MaterialReactTable,
  MRT_ActionMenuItem,
  type MRT_ColumnDef,
} from 'material-react-table';
import { data, type Person } from './makeData';
import { Edit, Delete } from '@mui/icons-material';

export const Example = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
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
    [],
    //end
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableRowActions
      renderRowActionMenuItems={({ row, table }) => [
        <MRT_ActionMenuItem //or just use a normal MUI MenuItem component
          icon={<Edit />}
          key="edit"
          label="Edit"
          onClick={() => console.info('Edit')}
          table={table}
        />,
        <MRT_ActionMenuItem
          icon={<Delete />}
          key="delete"
          label="Delete"
          onClick={() => console.info('Delete')}
          table={table}
        />,
      ]}
    />
  );
};

export default Example;
