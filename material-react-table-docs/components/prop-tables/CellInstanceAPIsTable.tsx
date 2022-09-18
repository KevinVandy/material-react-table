import React, { FC, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import MaterialReactTable, {
  MRT_ColumnDef,
  MRT_Cell,
} from 'material-react-table';
import { Link as MuiLink, Typography, useMediaQuery } from '@mui/material';
import { SampleCodeSnippet } from '../mdx/SampleCodeSnippet';
import { CellInstanceAPI, cellInstanceAPIs } from './cellInstanceAPIs';

interface Props {
  onlyProps?: Set<keyof MRT_Cell>;
}

const CellInstanceAPIsTable: FC<Props> = ({ onlyProps }) => {
  const isDesktop = useMediaQuery('(min-width: 1200px)');

  const columns = useMemo(
    () =>
      [
        {
          accessorKey: 'cellInstanceAPI',
          enableClickToCopy: true,
          header: 'State Option',
          muiTableBodyCellCopyButtonProps: ({ cell }) => ({
            className: 'cell-instance-api',
            id: `${cell.getValue<string>()}-cell-instance-api`,
          }),
          Cell: ({ cell }) => cell.getValue<string>(),
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
      ] as MRT_ColumnDef<CellInstanceAPI>[],
    [],
  );

  const [columnPinning, setColumnPinning] = useState({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isDesktop) {
        setColumnPinning({
          left: ['mrt-row-expand', 'mrt-row-numbers', 'cellInstanceAPI'],
          right: ['link'],
        });
      } else {
        setColumnPinning({});
      }
    }
  }, [isDesktop]);

  const data = useMemo(() => {
    if (onlyProps) {
      return cellInstanceAPIs.filter(({ cellInstanceAPI }) =>
        onlyProps.has(cellInstanceAPI),
      );
    }
    return cellInstanceAPIs;
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
      enableColumnOrdering={!onlyProps}
      enablePagination={false}
      enablePinning
      enableRowNumbers
      enableBottomToolbar={false}
      enableTopToolbar={!onlyProps}
      initialState={{
        columnVisibility: { description: false },
        density: 'compact',
        showGlobalFilter: true,
        sorting: [{ id: 'cellInstanceAPI', desc: false }],
      }}
      muiSearchTextFieldProps={{
        placeholder: 'Search Cell APIs',
        sx: { minWidth: '18rem' },
        variant: 'outlined',
      }}
      muiTablePaperProps={{
        sx: { mb: '1.5rem' },
        id: onlyProps
          ? 'relevant-cell-instance-apis-table'
          : 'cell-instance-apis-table',
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
      state={{ columnPinning }}
    />
  );
};

export default CellInstanceAPIsTable;
