import { useMemo } from 'react';
import { Box, Stack } from '@mui/material';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { data, type Person } from './makeData';

const Example = () => {
  const averageSalary = useMemo(
    () => data.reduce((acc, curr) => acc + curr.salary, 0) / data.length,
    [],
  );

  const maxAge = useMemo(
    () => data.reduce((acc, curr) => Math.max(acc, curr.age), 0),
    [],
  );

  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        header: 'First Name',
        accessorKey: 'firstName',
        enableGrouping: false, //do not let this column be grouped
      },
      {
        header: 'Last Name',
        accessorKey: 'lastName',
      },
      {
        header: 'Age',
        accessorKey: 'age',
        aggregationFn: 'max', //show the max age in the group (lots of pre-built aggregationFns to choose from)
        //required to render an aggregated cell
        AggregatedCell: ({ cell, table }) => (
          <>
            Oldest by{' '}
            {table.getColumn(cell.row.groupingColumnId ?? '').columnDef.header}:{' '}
            <Box
              sx={{ color: 'info.main', display: 'inline', fontWeight: 'bold' }}
            >
              {cell.getValue<number>()}
            </Box>
          </>
        ),
        Footer: () => (
          <Stack>
            Max Age:
            <Box color="warning.main">{Math.round(maxAge)}</Box>
          </Stack>
        ),
      },
      {
        header: 'Gender',
        accessorKey: 'gender',
        //optionally, customize the cell render when this column is grouped. Make the text blue and pluralize the word
        GroupedCell: ({ cell, row }) => (
          <Box sx={{ color: 'primary.main' }}>
            <strong>{cell.getValue<string>()}s </strong> ({row.subRows?.length})
          </Box>
        ),
      },
      {
        header: 'State',
        accessorKey: 'state',
      },
      {
        header: 'Salary',
        accessorKey: 'salary',
        aggregationFn: 'mean',
        //required to render an aggregated cell, show the average salary in the group
        AggregatedCell: ({ cell, table }) => (
          <>
            Average by{' '}
            {table.getColumn(cell.row.groupingColumnId ?? '').columnDef.header}:{' '}
            <Box sx={{ color: 'success.main', fontWeight: 'bold' }}>
              {cell.getValue<number>()?.toLocaleString?.('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </Box>
          </>
        ),
        //customize normal cell render on normal non-aggregated rows
        Cell: ({ cell }) => (
          <>
            {cell.getValue<number>()?.toLocaleString?.('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </>
        ),
        Footer: () => (
          <Stack>
            Average Salary:
            <Box color="warning.main">
              {averageSalary?.toLocaleString?.('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </Box>
          </Stack>
        ),
      },
    ],
    [averageSalary, maxAge],
  );

  const table = useMaterialReactTable({
    columns,
    data,
    displayColumnDefOptions: {
      'mrt-row-expand': {
        enableResizing: true,
      },
    },
    enableColumnResizing: true,
    enableGrouping: true,
    enableStickyHeader: true,
    enableStickyFooter: true,
    initialState: {
      density: 'compact',
      expanded: true, //expand all groups by default
      grouping: ['state'], //an array of columns to group by by default (can be multiple)
      pagination: { pageIndex: 0, pageSize: 20 },
      sorting: [{ id: 'state', desc: false }], //sort by state by default
    },
    muiToolbarAlertBannerChipProps: { color: 'primary' },
    muiTableContainerProps: { sx: { maxHeight: 700 } },
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
