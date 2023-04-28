import React, { useMemo } from 'react';
import TailwindCSSReactTable, {
  type TRT_ColumnDef,
} from 'tailwindcss-react-table';
import { ContentCopy } from '@mui/icons-material';
import { data, type Person } from './makeData';

const Example = () => {
  const columns = useMemo<TRT_ColumnDef<Person>[]>(
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
        muiTableBodyCellCopyButtonProps: {
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

  return <TailwindCSSReactTable columns={columns} data={data} />;
};

export default Example;
