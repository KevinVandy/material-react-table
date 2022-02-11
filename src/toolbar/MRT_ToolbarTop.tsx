import React, { FC } from 'react';
import { styled, Toolbar as MuiToolbar } from '@mui/material';
import { MRT_SearchTextField } from '../inputs/MRT_SearchTextField';
import { useMaterialReactTable } from '../useMaterialReactTable';
import { MRT_ToolbarButtons } from './MRT_ToolbarButtons';
import { MRT_TablePagination } from './MRT_TablePagination';

const Toolbar = styled(MuiToolbar)({
  display: 'grid',
  padding: '0.5rem !important',
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
    hideToolbarActions,
    manualPagination,
    muiTableToolbarTopProps,
    positionPagination,
    positionToolbarActions,
    renderToolbarActions,
    tableInstance,
  } = useMaterialReactTable();

  const toolbarProps =
    muiTableToolbarTopProps instanceof Function
      ? muiTableToolbarTopProps(tableInstance)
      : muiTableToolbarTopProps;

  return (
    <Toolbar variant="dense" {...toolbarProps}>
      <ToolbarTopRow>
        {renderToolbarActions?.(tableInstance) ?? <span />}
        <ToolbarActionsContainer>
          {!disableGlobalFilter && <MRT_SearchTextField />}
          {!hideToolbarActions && positionToolbarActions === 'top' && <MRT_ToolbarButtons />}
        </ToolbarActionsContainer>
      </ToolbarTopRow>
      <div>
        {!manualPagination && ['top', 'both'].includes(positionPagination ?? '') && (
          <MRT_TablePagination />
        )}
      </div>
    </Toolbar>
  );
};
