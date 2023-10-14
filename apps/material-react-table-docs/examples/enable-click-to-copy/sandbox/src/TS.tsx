import { useMemo } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { ContentCopy } from '@mui/icons-material';
import { data, type Person } from './makeData';

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
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
        enableClickToCopy: true,
        muiCopyButtonProps: {
          fullWidth: true,
          startIcon: <ContentCopy />,
          sx: { justifyContent: 'flex-start' },
        },
      },
      {
        accessorKey: 'city',
        header: 'City',
        enableClickToCopy: true,
      },
    ],
    [],
  );

  return <MaterialReactTable columns={columns} data={data} />;
};

export default Example;
