import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
} from 'material-react-table';
import { Link as MuiLink, Typography, useMediaQuery } from '@mui/material';
import { SampleCodeSnippet } from '../mdx/SampleCodeSnippet';
import { type RowInstanceAPI, rowInstanceAPIs } from './rowInstanceAPIs';

interface Props {
  onlyProps?: Set<keyof MRT_Row>;
}

const RowInstanceAPIsTable = ({ onlyProps }: Props) => {
  const isDesktop = useMediaQuery('(min-width: 1200px)');

  const columns = useMemo<MRT_ColumnDef<RowInstanceAPI>[]>(
    () => [
      {
        accessorKey: 'rowInstanceAPI',
        enableClickToCopy: true,
        header: 'State Option',
        muiCopyButtonProps: ({ cell }) => ({
          className: 'row-instance-api',
          id: `${cell.getValue<string>()}-row-instance-api`,
        }),
      },
      {
        accessorKey: 'type',
        header: 'Type',
        enableGlobalFilter: false,
        Cell: ({ cell }) => (
          <SampleCodeSnippet
            className="language-ts"
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
        accessorKey: 'link',
        disableFilters: true,
        enableGlobalFilter: false,
        header: 'More Info Links',
        Cell: ({ cell, row }) => (
          <Link href={cell.getValue<string>()} passHref legacyBehavior>
            <MuiLink
              target={
                cell.getValue<string>().startsWith('http')
                  ? '_blank'
                  : undefined
              }
              rel="noopener"
            >
              {row.original?.linkText}
            </MuiLink>
          </Link>
        ),
      },
    ],
    [],
  );

  const [columnPinning, setColumnPinning] = useState({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isDesktop) {
        setColumnPinning({
          left: ['mrt-row-expand', 'mrt-row-numbers', 'rowInstanceAPI'],
          right: ['link'],
        });
      } else {
        setColumnPinning({});
      }
    }
  }, [isDesktop]);

  const data = useMemo(() => {
    if (onlyProps) {
      return rowInstanceAPIs.filter(({ rowInstanceAPI }) =>
        onlyProps.has(rowInstanceAPI),
      );
    }
    return rowInstanceAPIs;
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
        columnVisibility: { description: false },
        density: 'compact',
        showGlobalFilter: true,
        sorting: [{ id: 'rowInstanceAPI', desc: false }],
      }}
      muiSearchTextFieldProps={{
        placeholder: 'Search Row APIs',
        sx: { minWidth: '18rem' },
        variant: 'outlined',
      }}
      muiTablePaperProps={{
        sx: { mb: '1.5rem' },
        id: onlyProps
          ? 'relevant-row-instance-apis-table'
          : 'row-instance-apis-table',
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

export default RowInstanceAPIsTable;
