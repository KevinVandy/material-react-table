import React from 'react';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import type { MRT_Row, MRT_TableInstance } from '..';

interface Props<TData extends Record<string, any> = {}> {
  row: MRT_Row<TData>;
  table: MRT_TableInstance<TData>;
  variant?: 'icon' | 'text';
}

export const MRT_EditActionButtons = <TData extends Record<string, any> = {}>({
  row,
  table,
  variant = 'icon',
}: Props<TData>) => {
  const {
    getState,
    options: {
      icons: { CancelIcon, SaveIcon },
      localization,
      onEditingRowSave,
    },
    setEditingRow,
  } = table;
  const { editingRow } = getState();

  const handleCancel = () => {
    setEditingRow(null);
  };

  const handleSave = () => {
    onEditingRowSave?.({
      row: editingRow ?? row,
      table,
      values: editingRow?._valuesCache ?? { ...row.original },
    });
    setEditingRow(null);
  };

  return (
    <Box sx={{ display: 'flex', gap: '0.75rem' }}>
      {variant === 'icon' ? (
        <>
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
        </>
      ) : (
        <>
          <Button onClick={handleCancel}>{localization.cancel}</Button>
          <Button onClick={handleSave} variant="contained">
            {localization.save}
          </Button>
        </>
      )}
    </Box>
  );
};
