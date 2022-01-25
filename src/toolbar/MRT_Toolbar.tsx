import React, { FC } from 'react';
import { styled, Toolbar as MuiToolbar, Typography } from '@mui/material';
import { MRT_SearchTextField } from '../inputs/MRT_SearchTextField';
import { useMaterialReactTable } from '../useMaterialReactTable';

const Toolbar = styled(MuiToolbar)({
  padding: '0.5rem',
  display: 'flex',
  justifyContent: 'space-between',
});

interface Props {}

export const MRT_Toolbar: FC<Props> = () => {
  const {
    enableSearch,
    muiTableTitleProps,
    muiTableToolbarProps,
    title,
  } = useMaterialReactTable();

  //if no features in the toolbar are enabled, don't render anything
  if (!enableSearch && !title && !muiTableToolbarProps) {
    return null;
  }

  return (
    <Toolbar variant="dense" {...muiTableToolbarProps}>
      {title ? (
        <Typography {...muiTableTitleProps}>{title}</Typography>
      ) : (
        <span />
      )}
      {enableSearch && <MRT_SearchTextField />}
    </Toolbar>
  );
};
