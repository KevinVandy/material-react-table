import React, { FC } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import type { MRT_Row, MRT_TableInstance } from '..';

interface Props {
  row: MRT_Row;
  instance: MRT_TableInstance;
}

export const MRT_EditActionButtons: FC<Props> = ({ row, instance }) => {
  const {
    getState,
    options: {
      icons: { CancelIcon, SaveIcon },
      localization,
      onEditRowSubmit,
    },
    setCurrentEditingRow,
  } = instance;

  const { currentEditingRow } = getState();

  const handleCancel = () => {
    row._valuesCache = row.original ?? {};
    setCurrentEditingRow(null);
  };

  const handleSave = () => {
    onEditRowSubmit?.({ row: currentEditingRow ?? row, instance });
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
