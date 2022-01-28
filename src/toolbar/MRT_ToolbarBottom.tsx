import React, { FC } from 'react';
import { styled, Toolbar as MuiToolbar } from '@mui/material';
import { useMaterialReactTable } from '../useMaterialReactTable';
import { MRT_TablePagination } from './MRT_TablePagination';
import { MRT_ToolbarButtons } from './MRT_ToolbarButtons';

const Toolbar = styled(MuiToolbar)({
  padding: 0,
  display: 'flex',
  justifyContent: 'space-between',
});

interface Props {}

export const MRT_ToolbarBottom: FC<Props> = () => {
  const {
    disableGlobalFilter,
    disableColumnHiding,
    manualPagination,
    positionPagination,
    disableFilters,
    hideToolbarActions,
    positionToolbarActions,
    muiTableToolbarBottomProps,
    title,
    tableInstance,
  } = useMaterialReactTable();

  // if no features in the toolbar are enabled, don't render anything
  if (
    !muiTableToolbarBottomProps &&
    !title &&
    disableColumnHiding &&
    disableFilters &&
    disableGlobalFilter
  ) {
    return null;
  }

  const toolbarProps =
    muiTableToolbarBottomProps instanceof Function
      ? muiTableToolbarBottomProps(tableInstance)
      : muiTableToolbarBottomProps;

  return (
    <Toolbar variant="dense" {...toolbarProps}>
      {!hideToolbarActions && positionToolbarActions === 'bottom' ? (
        <MRT_ToolbarButtons />
      ) : (
        <span />
      )}
      {!manualPagination &&
        ['bottom', 'both'].includes(positionPagination ?? '') && (
          <MRT_TablePagination />
        )}
    </Toolbar>
  );
};
