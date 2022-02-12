import React, { FC } from 'react';
import { styled, Toolbar as MuiToolbar } from '@mui/material';
import { useMRT } from '../useMRT';
import { MRT_TablePagination } from './MRT_TablePagination';
import { MRT_ToolbarButtons } from './MRT_ToolbarButtons';

const Toolbar = styled(MuiToolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 0.5rem !important',
});

interface Props {}

export const MRT_ToolbarBottom: FC<Props> = () => {
  const {
    hideToolbarActions,
    manualPagination,
    muiTableToolbarBottomProps,
    positionPagination,
    positionToolbarActions,
    tableInstance,
  } = useMRT();

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
