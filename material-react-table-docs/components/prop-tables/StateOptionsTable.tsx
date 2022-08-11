import React, { FC, useMemo } from 'react';
import Link from 'next/link';
import MaterialReactTable, {
  MRT_ColumnDef,
  MRT_TableState,
} from 'material-react-table';
import { Link as MuiLink } from '@mui/material';
import { StateRow, stateOptions } from './stateOptions';

interface Props {
  onlyProps?: Set<keyof MRT_TableState>;
}

const StateOptionsTable: FC<Props> = ({ onlyProps }) => {
  const columns = useMemo(
    () =>
      [
        {
          accessorKey: 'stateOption',
          enableClickToCopy: true,
          header: 'State Option',
          muiTableBodyCellProps: ({ cell }) => ({
            id: `${cell.getValue<string>()}-column-option`,
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
          Cell: ({ cell }) => (
            <Link href={cell.getValue() as string} passHref>
              <MuiLink
                target={
                  (cell.getValue() as string).startsWith('http')
                    ? '_blank'
                    : undefined
                }
                rel="noreferrer"
              >
                {cell.row.original?.linkText}
              </MuiLink>
            </Link>
          ),
        },
        { accessorKey: 'source', header: 'Source', enableGlobalFilter: false },
      ] as MRT_ColumnDef<StateRow>[],
    [],
  );

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
      enableColumnActions={!onlyProps}
      enableColumnFilterChangeMode
      enableColumnOrdering={!onlyProps}
      enablePagination={false}
      enablePinning
      enableRowNumbers
      enableBottomToolbar={false}
      enableTopToolbar={!onlyProps}
      initialState={{
        columnPinning: { left: ['mrt-row-numbers', 'stateOption'], right: [] },
        density: 'compact',
        showGlobalFilter: true,
        sorting: [{ id: 'stateOption', desc: false }],
      }}
      muiSearchTextFieldProps={{
        placeholder: 'Search State Options',
        sx: { minWidth: '18rem' },
        variant: 'outlined',
      }}
      muiTablePaperProps={{ sx: { mb: '1.5rem' } }}
      positionGlobalFilter="left"
      rowNumberMode="static"
    />
  );
};

export default StateOptionsTable;
