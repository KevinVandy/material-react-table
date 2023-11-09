import { useMemo } from 'react';
import {
  useMaterialReactTable,
  MRT_TableContainer,
  MRT_TableHeadCellFilterContainer,
} from 'material-react-table';
import { data } from './makeData';
import { Paper, Stack, useMediaQuery } from '@mui/material';

const Example = () => {
  const isMobile = useMediaQuery('(max-width: 1000px)');

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'firstName',
        header: 'First Name',
        filterVariant: 'autocomplete',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'gender',
        header: 'Gender',
        filterFn: 'equals',
        filterSelectOptions: ['Male', 'Female', 'Other'],
        filterVariant: 'select',
      },
      {
        accessorKey: 'age',
        header: 'Age',
        filterVariant: 'range',
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data,
    columnFilterDisplayMode: 'custom', //we will render our own filtering UI
    enableFacetedValues: true,
    muiFilterTextFieldProps: ({ column }) => ({
      label: `Filter by ${column.columnDef.header}`,
    }),
  });

  return (
    <Stack direction={isMobile ? 'column-reverse' : 'row'} gap="8px">
      <MRT_TableContainer table={table} />
      <Paper>
        <Stack p="8px" gap="8px">
          {table.getLeafHeaders().map((header) => (
            <MRT_TableHeadCellFilterContainer
              key={header.id}
              header={header}
              table={table}
              in
            />
          ))}
        </Stack>
      </Paper>
    </Stack>
  );
};

export default Example;
