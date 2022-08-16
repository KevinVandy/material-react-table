import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import { MRT_EditActionButtons } from '../buttons/MRT_EditActionButtons';
import type { MRT_Row, MRT_TableInstance } from '..';
import { MRT_EditCellTextField } from '../inputs/MRT_EditCellTextField';

interface Props<TData extends Record<string, any> = {}> {
  open: boolean;
  row: MRT_Row<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_EditRowModal = <TData extends Record<string, any> = {}>({
  open,
  row,
  table,
}: Props<TData>) => {
  const {
    options: { localization },
  } = table;

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">{localization.edit}</DialogTitle>
      <DialogContent>
        <Stack
          sx={{
            width: '100%',
            minWidth: { xs: '300px', sm: '360px', md: '400px' },
            gap: '1.5rem',
          }}
        >
          {row
            .getVisibleCells()
            .filter((cell) => cell.column.columnDef.columnDefType === 'data')
            .map((cell) => (
              <MRT_EditCellTextField
                cell={cell}
                key={cell.id}
                showLabel
                table={table}
              />
            ))}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <MRT_EditActionButtons row={row} table={table} variant="text" />
      </DialogActions>
    </Dialog>
  );
};
