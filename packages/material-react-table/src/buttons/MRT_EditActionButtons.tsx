import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
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
      onEditingRowCancel,
    },
    refs: { editInputRefs },
    setEditingRow,
  } = table;
  const { editingRow } = getState();

  const handleCancel = () => {
    onEditingRowCancel?.({ row, table });
    setEditingRow(null);
  };

  const handleSave = () => {
    //look for auto-filled input values
    Object.values(editInputRefs?.current)?.forEach((input) => {
      if (
        input.value !== undefined &&
        Object.hasOwn(editingRow?._valuesCache as object, input.name)
      ) {
        // @ts-ignore
        editingRow._valuesCache[input.name] = input.value;
      }
    });
    onEditingRowSave?.({
      exitEditingMode: () => setEditingRow(null),
      row: editingRow ?? row,
      table,
      values: editingRow?._valuesCache ?? { ...row.original },
    });
  };

  return (
    <Box
      onClick={(e) => e.stopPropagation()}
      sx={{ display: 'flex', gap: '0.75rem' }}
    >
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
