import React, { useMemo } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { Link } from '@mui/material';
import { StateRow, stateOptions } from './stateOptions';

const StateOptionsTable = () => {
  const columns = useMemo(
    () =>
      [
        {
          enableClickToCopy: true,
          header: 'State Name',
          id: 'stateName',
        },
        { header: 'Type', id: 'type', enableGlobalFilter: false },
        {
          header: 'Default Value',
          id: 'defaultValue',
          enableGlobalFilter: false,
        },
        {
          header: 'More Info Links',
          id: 'link',
          disableFilters: true,
          enableGlobalFilter: false,
          Cell: ({ cell }) => (
            <Link href={cell.getValue() as string} target="_blank">
              {cell.row.original?.linkText}
            </Link>
          ),
        },
        { header: 'Description', id: 'description', enableGlobalFilter: false },
        { header: 'Source', id: 'source', enableGlobalFilter: false },
      ] as MRT_ColumnDef<StateRow>[],
    [],
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={stateOptions}
      enableColumnOrdering
      enablePagination={false}
      enablePinning
      enableRowNumbers
      enableToolbarBottom={false}
      initialState={{
        columnPinning: { left: ['mrt-row-numbers', 'stateName'], right: [] },
        density: 'compact',
        showGlobalFilter: true,
        sorting: [{ id: 'stateName', desc: false }],
      }}
      muiSearchTextFieldProps={{
        placeholder: 'Search State Options',
        sx: { minWidth: '18rem' },
        variant: 'outlined',
      }}
      positionGlobalFilter="left"
      rowNumberMode="static"
    />
  );
};

export default StateOptionsTable;
