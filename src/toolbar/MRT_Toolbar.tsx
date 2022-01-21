import React, { FC } from 'react';
import { styled, Toolbar as MuiToolbar, Typography } from '@mui/material';
import { MRT_SearchTextField } from '../inputs/MRT_SearchTextField';
import { useMaterialReactTable } from '../useMaterialReactTable';
import { MRT_HideColumnsButtonMenu } from '../buttons/MRT_HideColumnsButtonMenu';

const Toolbar = styled(MuiToolbar)({
  padding: '0.5rem',
  display: 'flex',
  justifyContent: 'space-between',
});

interface Props {}

export const MRT_Toolbar: FC<Props> = () => {
  const {
    OverrideTableToolbarComponent,
    enableSearch,
    enableColumnHiding,
    tableInstance,
    tableTitleProps,
    tableToolbarProps,
    title,
  } = useMaterialReactTable();

  if (OverrideTableToolbarComponent) {
    return <>{OverrideTableToolbarComponent(tableInstance)}</>;
  }

  if (!enableSearch && !title && !tableToolbarProps && !enableColumnHiding) {
    return null;
  }

  return (
    <Toolbar variant="dense" {...tableToolbarProps}>
      {title ? <Typography {...tableTitleProps}>{title}</Typography> : <span />}
      {enableSearch && <MRT_SearchTextField />}
      {enableColumnHiding && <MRT_HideColumnsButtonMenu />}
    </Toolbar>
  );
};
