import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  MaterialReactTable,
  type MaterialReactTableProps,
  type MRT_ColumnDef,
} from 'material-react-table';
import {
  Link as MuiLink,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { SampleCodeSnippet } from '../mdx/SampleCodeSnippet';
import { type PropRow, rootProps } from './rootProps';

interface Props {
  onlyProps?: Set<keyof MaterialReactTableProps>;
}

const RootPropTable = ({ onlyProps }: Props) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery('(min-width: 1200px)');

  const columns = useMemo<MRT_ColumnDef<PropRow>[]>(
    () => [
      {
        enableClickToCopy: true,
        header: 'Prop Name',
        accessorKey: 'propName',
        muiCopyButtonProps: ({ cell }) => ({
          className: 'prop',
          id: `${cell.getValue<string>()}-prop`,
        }),
        Cell: ({ renderedCellValue, row }) =>
          row.original?.required ? (
            <strong style={{ color: theme.palette.primary.dark }}>
              {renderedCellValue}*
            </strong>
          ) : (
            renderedCellValue
          ),
      },
      {
        header: 'Type',
        accessorKey: 'type',
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
        header: 'Required',
        accessorKey: 'required',
        enableGlobalFilter: false,
      },
      {
        header: 'Default Value',
        accessorKey: 'defaultValue',
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
        header: 'Description',
        accessorKey: 'description',
        enableGlobalFilter: false,
      },
      {
        header: 'More Info Links',
        accessorKey: 'link',
        disableFilters: true,
        enableGlobalFilter: false,
        Cell: ({ cell, row }) => (
          <Link href={cell.getValue<string>()} passHref legacyBehavior>
            <MuiLink
              color={
                row.original.source === 'MRT'
                  ? 'text.primary'
                  : row.original.source === 'Material UI'
                  ? 'primary.main'
                  : row.original.source === 'TanStack Table'
                  ? 'secondary.main'
                  : undefined
              }
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
    [theme],
  );

  const [columnPinning, setColumnPinning] = useState({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isDesktop) {
        setColumnPinning({
          left: ['mrt-row-expand', 'mrt-row-numbers', 'propName'],
          right: ['link'],
        });
      } else {
        setColumnPinning({});
      }
    }
  }, [isDesktop]);

  const data = useMemo(() => {
    if (onlyProps) {
      return rootProps.filter(({ propName }) => onlyProps.has(propName));
    }
    return rootProps;
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
          { id: 'propName', desc: false },
        ],
      }}
      muiSearchTextFieldProps={{
        placeholder: 'Search All Props',
        sx: { minWidth: '18rem' },
        variant: 'outlined',
      }}
      muiTablePaperProps={{
        sx: { mb: '1.5rem' },
        id: onlyProps ? 'relevant-props-table' : 'props-table',
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

export default RootPropTable;
