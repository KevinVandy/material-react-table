import React, { FC, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import {
  Link as MuiLink,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { SampleCodeSnippet } from '../mdx/SampleCodeSnippet';
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
          muiTableBodyCellCopyButtonProps: ({ cell, row }) => ({
            className: 'column-option',
            // component: 'a',
            id: `${cell.getValue<string>()}-column-option`,
            // href: `#${cell.getValue<string>()}-column-option`,
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
        {
          accessorKey: 'type',
          header: 'Type',
          enableGlobalFilter: false,
          Cell: ({ cell }) => (
            <SampleCodeSnippet
              className="language-js"
              enableCopyButton={false}
              style={{
                backgroundColor: 'transparent',
                fontSize: '0.9rem',
                margin: 0,
                padding: 0,
                minHeight: 'unset',
              }}
            >
              {cell.getValue<string>()}
            </SampleCodeSnippet>
          ),
        },
        {
          accessorKey: 'required',
          enableGlobalFilter: false,
          header: 'Required',
        },
        {
          accessorKey: 'defaultValue',
          enableGlobalFilter: false,
          header: 'Default Value',
          Cell: ({ cell }) => (
            <SampleCodeSnippet
              className="language-js"
              enableCopyButton={false}
              style={{
                backgroundColor: 'transparent',
                fontSize: '0.9rem',
                margin: 0,
                padding: 0,
                minHeight: 'unset',
              }}
            >
              {cell.getValue<string>()}
            </SampleCodeSnippet>
          ),
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
      ] as MRT_ColumnDef<ColumnOption>[],
    [theme],
  );

  const [columnPinning, setColumnPinning] = useState({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isDesktop) {
        setColumnPinning({
          left: ['mrt-row-expand', 'mrt-row-numbers', 'columnOption'],
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
      displayColumnDefOptions={{
        'mrt-row-numbers': {
          size: 10,
        },
        'mrt-row-expand': {
          size: 10,
        },
      }}
      enableColumnActions={!onlyProps}
      enableColumnFilterModes
      enablePagination={false}
      enablePinning
      enableRowNumbers
      enableBottomToolbar={false}
      enableTopToolbar={!onlyProps}
      initialState={{
        columnVisibility: { required: false, description: false },
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
      renderDetailPanel={({ row }) => (
        <Typography
          color={row.original.description ? 'secondary.main' : 'text.secondary'}
        >
          {row.original.description || 'No Description Provided... Yet...'}
        </Typography>
      )}
      rowNumberMode="static"
      onColumnPinningChange={setColumnPinning}
      state={{ columnPinning }}
    />
  );
};

export default ColumnOptionsTable;
