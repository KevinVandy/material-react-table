import React, { FC } from 'react';
import { alpha, styled, Toolbar as MuiToolbar } from '@mui/material';
import { MRT_SearchTextField } from '../inputs/MRT_SearchTextField';
import { useMRT } from '../useMRT';
import { MRT_ToolbarInternalButtons } from './MRT_ToolbarInternalButtons';
import { MRT_TablePagination } from './MRT_TablePagination';
import { MRT_ToolbarAlertBanner } from './MRT_ToolbarAlertBanner';

const Toolbar = styled(MuiToolbar, {
  shouldForwardProp: (prop) => prop !== 'fullScreen',
})<{ fullScreen?: boolean }>(({ fullScreen, theme }) => ({
  backgroundColor: theme.palette.background.default,
  backgroundImage: `linear-gradient(${alpha(
    theme.palette.common.white,
    0.05,
  )},${alpha(theme.palette.common.white, 0.05)})`,
  display: 'grid',
  padding: '0 0.5rem !important',
  position: fullScreen ? 'sticky' : undefined,
  top: fullScreen ? '0' : undefined,
  width: 'calc(100% - 1rem)',
  zIndex: 1,
}));

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
    fullScreen,
    positionToolbarAlertBanner,
    renderToolbarCustomActions,
    tableInstance,
  } = useMRT();

  const toolbarProps =
    muiTableToolbarTopProps instanceof Function
      ? muiTableToolbarTopProps(tableInstance)
      : muiTableToolbarTopProps;

  return (
    <Toolbar fullScreen={fullScreen} variant="dense" {...toolbarProps}>
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
