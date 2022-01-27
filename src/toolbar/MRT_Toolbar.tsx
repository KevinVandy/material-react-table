import React, { FC } from 'react';
import { styled, Toolbar as MuiToolbar, Typography } from '@mui/material';
import { MRT_SearchTextField } from '../inputs/MRT_SearchTextField';
import { useMaterialReactTable } from '../useMaterialReactTable';
import { MRT_ToolbarButtons } from './MRT_ToolbarButtons';

const Toolbar = styled(MuiToolbar)({
  padding: '0.5rem',
  display: 'flex',
  justifyContent: 'space-between',
});

const ToolbarActionsContainer = styled('div')({
  display: 'flex',
  gap: '0.5rem',
});

interface Props {}

export const MRT_Toolbar: FC<Props> = () => {
  const {
    disableGlobalFilter,
    disableColumnHiding,
    muiTableTitleProps,
    disableFilters,
    muiTableToolbarProps,
    title,
  } = useMaterialReactTable();

  // if no features in the toolbar are enabled, don't render anything
  if (
    !muiTableToolbarProps &&
    !title &&
    disableColumnHiding &&
    disableFilters &&
    disableGlobalFilter
  ) {
    return null;
  }

  return (
    <Toolbar variant="dense" {...muiTableToolbarProps}>
      {title ? (
        <Typography {...muiTableTitleProps}>{title}</Typography>
      ) : (
        <span />
      )}
      <ToolbarActionsContainer>
        {!disableGlobalFilter && <MRT_SearchTextField />}
        <MRT_ToolbarButtons />
      </ToolbarActionsContainer>
    </Toolbar>
  );
};
