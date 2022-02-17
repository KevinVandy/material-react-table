import React, { FC } from 'react';
import { styled, Toolbar as MuiToolbar } from '@mui/material';
import { MRT_SearchTextField } from '../inputs/MRT_SearchTextField';
import { useMRT } from '../useMRT';
import { MRT_ToolbarInternalButtons } from './MRT_ToolbarInternalButtons';
import { MRT_TablePagination } from './MRT_TablePagination';
import { MRT_ToolbarAlertBanner } from './MRT_ToolbarAlertBanner';

const Toolbar = styled(MuiToolbar)({
  display: 'grid',
  padding: '0 0.5rem !important',
});

const ToolbarTopRow = styled('div')({
  padding: '0.5rem',
  display: 'flex',
  justifyContent: 'space-between',
});

const ToolbarActionsContainer = styled('div')({
  display: 'flex',
  gap: '0.5rem',
  position: 'relative',
  zIndex: 3,
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
    positionToolbarAlertBanner,
    renderToolbarCustomActions,
    tableInstance,
  } = useMRT();

  const toolbarProps =
    muiTableToolbarTopProps instanceof Function
      ? muiTableToolbarTopProps(tableInstance)
      : muiTableToolbarTopProps;

  return (
    <Toolbar variant="dense" {...toolbarProps}>
      {positionToolbarAlertBanner === 'top' && <MRT_ToolbarAlertBanner />}
      <ToolbarTopRow>
        {renderToolbarCustomActions?.(tableInstance) ?? <span />}
        <ToolbarActionsContainer>
          {!disableGlobalFilter && <MRT_SearchTextField />}
          {!hideToolbarActions && positionToolbarActions === 'top' && (
            <MRT_ToolbarInternalButtons />
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
