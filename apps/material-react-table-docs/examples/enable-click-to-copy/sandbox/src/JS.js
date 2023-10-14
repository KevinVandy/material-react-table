import { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { ContentCopy } from '@mui/icons-material';
import { data } from './makeData';

const Example = () => {
  const columns = useMemo(
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
      },
    ],
    [],
  );

  return <MaterialReactTable columns={columns} data={data} />;
};

export default Example;
