import React, { useMemo } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { Link, useTheme } from '@mui/material';
import { ColumnOption, columnOptions } from './columnOptions';

const ColumnOptionsTable = () => {
  const theme = useTheme();

  const columns = useMemo(
    () =>
      [
        {
          enableClickToCopy: true,
          header: 'Column Option',
          accessorKey: 'columnOption',
          Cell: ({ cell }) =>
            cell.row.original?.required ? (
              <strong style={{ color: theme.palette.primary.dark }}>
                <>{cell.getValue()}*</>
              </strong>
            ) : (
              cell.getValue()
            ),
        },
        { header: 'Type', accessorKey: 'type', enableGlobalFilter: false },
        {
          header: 'Required',
          accessorKey: 'required',
          enableGlobalFilter: false,
        },
        {
          header: 'Default Value',
          accessorKey: 'defaultValue',
          enableGlobalFilter: false,
        },
        {
          header: 'More Info Links',
          accessorKey: 'link',
          disableFilters: true,
          enableGlobalFilter: false,
          Cell: ({ cell }) => (
            <Link href={cell.getValue() as string} target="_blank">
              {cell.row.original?.linkText}
            </Link>
          ),
        },
        {
          header: 'Description',
          accessorKey: 'description',
          enableGlobalFilter: false,
        },
        { header: 'Source', accessorKey: 'source', enableGlobalFilter: false },
      ] as MRT_ColumnDef<ColumnOption>[],
    [theme],
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={columnOptions}
      enableColumnOrdering
      enablePagination={false}
      enablePinning
      enableRowNumbers
      enableToolbarBottom={false}
      initialState={{
        columnVisibility: { required: false },
        density: 'compact',
        showGlobalFilter: true,
        sorting: [
          { accessorKey: 'required', desc: true },
          { accessorKey: 'columnOption', desc: false },
        ],
        columnPinning: { left: ['mrt-row-numbers', 'columnOption'], right: [] },
      }}
      muiSearchTextFieldProps={{
        placeholder: 'Search Column Options',
        sx: { minWidth: '18rem' },
        variant: 'outlined',
      }}
      positionGlobalFilter="left"
      rowNumberMode="static"
    />
  );
};

export default ColumnOptionsTable;
