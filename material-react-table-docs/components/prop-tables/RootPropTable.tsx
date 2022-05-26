import React, { useMemo } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { Link, useTheme } from '@mui/material';

const RootPropTable = () => {
  const theme = useTheme();

  const columns = useMemo(
    () =>
      [
        {
          enableClickToCopy: true,
          header: 'Prop',
          id: 'prop',
          Cell: ({ cell }) =>
            cell.row.original?.required ? (
              <strong style={{ color: theme.palette.primary.dark }}>
                <>{cell.getValue()}*</>
              </strong>
            ) : (
              cell.getValue()
            ),
        },
        { header: 'Type', id: 'type', disableFilters: true },
        { header: 'Default', id: 'defaultValue', disableFilters: true },
        {
          header: 'More Info Links',
          id: 'link',
          disableFilters: true,
          Cell: ({ cell }) => (
            <Link href={cell.getValue() as string} target="_blank">
              {' '}
              {cell.row.original?.linkText}{' '}
            </Link>
          ),
        },
        { header: 'Description', id: 'description' },
      ] as MRT_ColumnDef<typeof data[0]>[],
    [theme],
  );

  const data = useMemo(
    () => [
      {
        defaultValue: 'undefined',
        description: 'The data to be displayed in the table.',
        link: '/docs/usage',
        linkText: 'See docs',
        prop: 'data',
        required: true,
        type: 'Array<any>',
      },
    ],
    [],
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enablePagination={false}
      enableToolbarBottom={false}
      enablePinning
      initialState={{
        isDensePadding: true,
        showGlobalFilter: true,
        sorting: [{ id: 'prop', desc: false }],
        columnPinning: { left: ['prop'] },
      }}
    />
  );
};

export default RootPropTable;
