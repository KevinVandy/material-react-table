import React, { FC } from 'react';
import { styled, Toolbar as MuiToolbar, Typography } from '@mui/material';
import { MRT_SearchTextField } from '../inputs/MRT_SearchTextField';
import { useMaterialReactTable } from '../useMaterialReactTable';
import { MRT_ToolbarButtons } from './MRT_ToolbarButtons';
import { MRT_TablePagination } from './MRT_TablePagination';

const Toolbar = styled(MuiToolbar)({
  display: 'grid',
});

const ToolbarTopRow = styled('div')({
  padding: '0.5rem',
  display: 'flex',
  justifyContent: 'space-between',
});

const ToolbarActionsContainer = styled('div')({
  display: 'flex',
  gap: '0.5rem',
});

interface Props {}

export const MRT_ToolbarTop: FC<Props> = () => {
  const {
    disableGlobalFilter,
    disableColumnHiding,
    muiTableTitleProps,
    disableFilters,
    manualPagination,
    positionPagination,
    muiTableToolbarTopProps,
    hideToolbarActions,
    positionToolbarActions,
    title,
    tableInstance,
  } = useMaterialReactTable();

  // if no features in the toolbar are enabled, don't render anything
  if (
    !muiTableToolbarTopProps &&
    !title &&
    disableColumnHiding &&
    disableFilters &&
    disableGlobalFilter
  ) {
    return null;
  }

  const toolbarProps =
    muiTableToolbarTopProps instanceof Function
      ? muiTableToolbarTopProps(tableInstance)
      : muiTableToolbarTopProps;

  return (
    <Toolbar variant="dense" {...toolbarProps}>
      <ToolbarTopRow>
        {title ? (
          <Typography variant="h5" {...muiTableTitleProps}>
            {title}
          </Typography>
        ) : (
          <span />
        )}
        <ToolbarActionsContainer>
          {!disableGlobalFilter && <MRT_SearchTextField />}
          {!hideToolbarActions && positionToolbarActions === 'top' && (
            <MRT_ToolbarButtons />
          )}
        </ToolbarActionsContainer>
      </ToolbarTopRow>
      <div>
        {!manualPagination &&
          ['top', 'both'].includes(positionPagination ?? '') && (
            <MRT_TablePagination />
          )}
      </div>
    </Toolbar>
  );
};
