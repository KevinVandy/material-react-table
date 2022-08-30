import React, { FC, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import MaterialReactTable, {
  MRT_ColumnDef,
  MRT_TableState,
} from 'material-react-table';
import { Link as MuiLink, Typography, useMediaQuery } from '@mui/material';
import { StateRow, stateOptions } from './stateOptions';

interface Props {
  onlyProps?: Set<keyof MRT_TableState>;
}

const StateOptionsTable: FC<Props> = ({ onlyProps }) => {
  const isDesktop = useMediaQuery('(min-width: 1200px)');

  const columns = useMemo(
    () =>
      [
        {
          accessorKey: 'stateOption',
          enableClickToCopy: true,
          header: 'State Option',
          muiTableBodyCellCopyButtonProps: ({ cell }) => ({
            className: 'state-option',
            // component: 'a',
            id: `${cell.getValue<string>()}-state-option`,
            // href: `#${cell.getValue<string>()}-state-option`,
          }),
          Cell: ({ cell }) => cell.getValue<string>(),
        },
        { accessorKey: 'type', header: 'Type', enableGlobalFilter: false },
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
      ] as MRT_ColumnDef<StateRow>[],
    [],
  );

  const [columnPinning, setColumnPinning] = useState({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isDesktop) {
        setColumnPinning({
          left: ['mrt-row-expand', 'mrt-row-numbers', 'stateOption'],
          right: ['link'],
        });
      } else {
        setColumnPinning({});
      }
    }
  }, [isDesktop]);

  const data = useMemo(() => {
    if (onlyProps) {
      return stateOptions.filter(({ stateOption }) =>
        onlyProps.has(stateOption),
      );
    }
    return stateOptions;
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
        sorting: [{ id: 'stateOption', desc: false }],
      }}
      muiSearchTextFieldProps={{
        placeholder: 'Search State Options',
        sx: { minWidth: '18rem' },
        variant: 'outlined',
      }}
      muiTablePaperProps={{
        sx: { mb: '1.5rem' },
        id: onlyProps ? 'relevant-state-options-table' : 'state-options-table',
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

export default StateOptionsTable;
