import React, { FC, useMemo } from 'react';
import MaterialReactTable, {
  MRT_ColumnDef,
  MRT_TableState,
} from 'material-react-table';
import { Link } from '@mui/material';
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
        },
        { accessorKey: 'type', header: 'Type', enableGlobalFilter: false },
        {
          accessorKey: 'defaultValue',
          enableGlobalFilter: false,
          header: 'Default Value',
        },
        {
          accessorKey: 'link',
          disableFilters: true,
          enableGlobalFilter: false,
          header: 'More Info Links',
          Cell: ({ cell }) => (
            <Link href={cell.getValue() as string} target="_blank">
              {cell.row.original?.linkText}
            </Link>
          ),
        },
        {
          accessorKey: 'description',
          enableGlobalFilter: false,
          header: 'Description',
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
      enableColumnOrdering={!onlyProps}
      enablePagination={false}
      enablePinning
      enableRowNumbers
      enableToolbarBottom={false}
      enableToolbarTop={!onlyProps}
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
      muiTablePaperProps={{ sx: { mb: '1rem' } }}
      positionGlobalFilter="left"
      rowNumberMode="static"
    />
  );
};

export default StateOptionsTable;
