import React, { FC } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import type { MRT_Row, MRT_TableInstance } from '..';
import { RowValues } from '@tanstack/react-table';

interface Props {
  row: MRT_Row;
  tableInstance: MRT_TableInstance;
}

export const MRT_EditActionButtons: FC<Props> = ({ row, tableInstance }) => {
  const {
    getState,
    options: {
      icons: { CancelIcon, SaveIcon },
      localization,
      onRowEditSubmit,
      setCurrentEditingRow,
    },
  } = tableInstance;

  const handleCancel = () => {
    row.values = (row.original as RowValues) ?? {};
    setCurrentEditingRow(null);
  };

  const handleSave = async () => {
    await onRowEditSubmit?.(getState().currentEditingRow ?? row);
    setCurrentEditingRow(null);
  };

  return (
    <Box sx={{ display: 'flex', gap: '0.75rem' }}>
      <Tooltip arrow title={localization.cancel}>
        <IconButton aria-label={localization.cancel} onClick={handleCancel}>
          <CancelIcon />
        </IconButton>
      </Tooltip>
      <Tooltip arrow title={localization.save}>
        <IconButton
          aria-label={localization.save}
          color="info"
          onClick={handleSave}
        >
          <SaveIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
