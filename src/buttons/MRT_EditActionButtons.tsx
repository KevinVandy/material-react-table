import React, { FC } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import type { MRT_Row, MRT_TableInstance } from '..';

interface Props {
  row: MRT_Row;
  table: MRT_TableInstance;
}

export const MRT_EditActionButtons: FC<Props> = ({ row, table }) => {
  const {
    getState,
    options: {
      icons: { CancelIcon, SaveIcon },
      localization,
      onEditRowSubmit,
    },
    setEditingRow,
  } = table;
  const { editingRow } = getState();

  const handleCancel = () => {
    row._valuesCache = { ...row.original };
    setEditingRow(null);
  };

  const handleSave = () => {
    onEditRowSubmit?.({
      row: editingRow ?? row,
      table,
      values: editingRow?._valuesCache ?? { ...row.original },
    });
    setEditingRow(null);
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
