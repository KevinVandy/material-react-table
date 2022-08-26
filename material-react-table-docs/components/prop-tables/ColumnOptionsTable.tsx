import React, { FC, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { Link as MuiLink, useMediaQuery, useTheme } from '@mui/material';
import { ColumnOption, columnOptions } from './columnOptions';

interface Props {
  onlyProps?: Set<keyof MRT_ColumnDef>;
}

const ColumnOptionsTable: FC<Props> = ({ onlyProps }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery('(min-width: 1200px)');

  const columns = useMemo(
    () =>
      [
        {
          accessorKey: 'columnOption',
          enableClickToCopy: true,
          header: 'Column Option',
          muiTableBodyCellCopyButtonProps: ({ cell }) => ({
            className: 'column-option',
            component: 'a',
            id: `${cell.getValue<string>()}-column-option`,
            href: `#${cell.getValue<string>()}-column-option`,
          }),
          Cell: ({ cell, row }) =>
            row.original?.required ? (
              <strong style={{ color: theme.palette.primary.dark }}>
                {cell.getValue<string>()}*
              </strong>
            ) : (
              cell.getValue<string>()
            ),
        },
        { accessorKey: 'type', header: 'Type', enableGlobalFilter: false },
        {
          accessorKey: 'required',
          enableGlobalFilter: false,
          header: 'Required',
        },
        {
          accessorKey: 'defaultValue',
          enableGlobalFilter: false,
          header: 'Default Value',
        },
        {
          accessorKey: 'description',
          enableGlobalFilter: false,
          header: 'Description',
        },
        {
          accessorKey: 'link',
          disableFilters: true,
          enableGlobalFilter: false,
          header: 'More Info Links',
          Cell: ({ cell, row }) => (
            <Link href={cell.getValue() as string} passHref>
              <MuiLink
                target={
                  (cell.getValue() as string).startsWith('http')
                    ? '_blank'
                    : undefined
                }
                rel="noreferrer"
              >
                {row.original?.linkText}
              </MuiLink>
            </Link>
          ),
        },
        { accessorKey: 'source', header: 'Source', enableGlobalFilter: false },
      ] as MRT_ColumnDef<ColumnOption>[],
    [theme],
  );

  const [columnPinning, setColumnPinning] = useState({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isDesktop) {
        setColumnPinning({
          left: ['mrt-row-numbers', 'columnOption'],
          right: ['link'],
        });
      } else {
        setColumnPinning({});
      }
    }
  }, [isDesktop]);

  const data = useMemo(() => {
    if (onlyProps) {
      return columnOptions.filter(({ columnOption }) =>
        onlyProps.has(columnOption),
      );
    }
    return columnOptions;
  }, [onlyProps]);

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableColumnActions={!onlyProps}
      enableColumnFilterModes
      enableColumnOrdering={!onlyProps}
      enablePagination={false}
      enablePinning
      enableRowNumbers
      enableBottomToolbar={false}
      enableTopToolbar={!onlyProps}
      initialState={{
        columnVisibility: { required: false },
        density: 'compact',
        showGlobalFilter: true,
        sorting: [
          { id: 'required', desc: true },
          { id: 'columnOption', desc: false },
        ],
      }}
      muiSearchTextFieldProps={{
        placeholder: 'Search Column Options',
        sx: { minWidth: '18rem' },
        variant: 'outlined',
      }}
      muiTablePaperProps={{
        sx: { mb: '1.5rem' },
        id: onlyProps
          ? 'relevant-column-options-table'
          : 'column-options-table',
      }}
      positionGlobalFilter="left"
      rowNumberMode="static"
      state={{ columnPinning }}
    />
  );
};

export default ColumnOptionsTable;
