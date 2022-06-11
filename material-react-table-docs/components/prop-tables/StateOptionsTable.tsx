import React, { useMemo } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { Link } from '@mui/material';
import { StateRow, stateOptions } from './stateOptions';

const RootPropTable = () => {
  const columns = useMemo(
    () =>
      [
        {
          enableClickToCopy: true,
          header: 'State Name',
          id: 'stateName',
        },
        { header: 'Type', id: 'type', enableGlobalFilter: false },
        { header: 'Default', id: 'defaultValue', enableGlobalFilter: false },
        { header: 'Description', id: 'description', enableGlobalFilter: false },
        {
          header: 'More Info Links',
          id: 'link',
          disableFilters: true,
          enableGlobalFilter: false,
          Cell: ({ cell }) => (
            <Link href={cell.getValue() as string} target="_blank">
              {' '}
              {cell.row.original?.linkText}{' '}
            </Link>
          ),
        },
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
        isDensePadding: true,
        showGlobalFilter: true,
        sorting: [
          { id: 'stateName', desc: false },
        ],
        columnPinning: { left: ['mrt-row-numbers', 'stateName'], right: [] },
      }}
      muiSearchTextFieldProps={{
        placeholder: 'Search All States',
        variant: 'outlined',
      }}
      positionGlobalFilter="left"
      rowNumberMode="static"
      tableId="root"
    />
  );
};

export default RootPropTable;
