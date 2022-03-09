import React, { FC } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useMRT } from '../useMRT';
import type { MRT_Row } from '..';

interface Props {
  row: MRT_Row;
}

export const MRT_EditActionButtons: FC<Props> = ({ row }) => {
  const {
    icons: { CancelIcon, SaveIcon },
    localization,
    onRowEditSubmit,
    setCurrentEditingRow,
    tableInstance: {
      state: { currentEditingRow },
    },
  } = useMRT();

  const handleCancel = () => {
    row.values = row.original;
    setCurrentEditingRow(null);
  };

  const handleSave = async () => {
    await onRowEditSubmit?.(currentEditingRow ?? row);
    setCurrentEditingRow(null);
  };

  return (
    <Box sx={{ display: 'flex', gap: '0.75rem' }}>
      <Tooltip arrow title={localization.rowActionButtonCancel}>
        <IconButton
          aria-label={localization.rowActionButtonCancel}
          onClick={handleCancel}
        >
          <CancelIcon />
        </IconButton>
      </Tooltip>
      <Tooltip arrow title={localization.rowActionButtonSave}>
        <IconButton
          aria-label={localization.rowActionButtonSave}
          color="info"
          onClick={handleSave}
        >
          <SaveIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
