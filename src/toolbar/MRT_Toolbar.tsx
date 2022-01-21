import React, { FC } from 'react';
import { styled, Toolbar as MuiToolbar, Typography } from '@mui/material';
import { MRT_SearchTextField } from '../inputs/MRT_SearchTextField';
import { useMaterialReactTable } from '../useMaterialReactTable';
import { MRT_ShowHideColumnsButtonMenu } from '../buttons/MRT_ShowHideColumnsButtonMenu';

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

  //if no features in the toolbar are enabled, don't render anything
  if (!enableSearch && !title && !tableToolbarProps && !enableColumnHiding) {
    return null;
  }

  return (
    <Toolbar variant="dense" {...tableToolbarProps}>
      {title ? <Typography {...tableTitleProps}>{title}</Typography> : <span />}
      {enableSearch && <MRT_SearchTextField />}
      {enableColumnHiding && <MRT_ShowHideColumnsButtonMenu />}
    </Toolbar>
  );
};
